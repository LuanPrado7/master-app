import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import  { Usuario } from './cadastro-form/usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { log } from "util";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
  user: Usuario;
  modal: any;
  private readonly notifier: NotifierService;

  constructor(
    private spinner: NgxSpinnerService,
    notifierService: NotifierService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    localStorage.clear();
  }
  
  jogar() {
    console.log('entrou');
    
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
