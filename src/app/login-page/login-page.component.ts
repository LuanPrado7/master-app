import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import  { Usuario } from './cadastro-form/usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'ng-animate';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 3, delay: 0 }
    }))])
  ]
})

export class LoginPageComponent {
  user: Usuario;
  modal: any;
  light: boolean;
  private readonly notifier: NotifierService;

  constructor(
    private spinner: NgxSpinnerService,
    notifierService: NotifierService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.light = false;
    setInterval(() => {
      this.light = !this.light;
    }, 2000)
    localStorage.clear();
  }
  
  jogar() {
    ('entrou');
    
    this.user = new Usuario("","","","",0,1,'default.png', false);

    this.httpClient
      .post("http://monica:64803/api/Usuario", this.user, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          localStorage.setItem("userId", JSON.stringify(res.body));
          setTimeout(() => {
            this.spinner.hide();
            localStorage.setItem("cadastrado", "false");
            this.router.navigate(["/room"]);
          }, 2000);
        },
        err => {
          setTimeout(() => {
            this.spinner.hide();
            localStorage.clear();
            this.notifier.notify(
              "error",
              "Não foi possível cadastrar. Por favor, tente novamente"
            );
          }, 2000);
        }
      );
  }

}
