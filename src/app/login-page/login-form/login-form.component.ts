import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioLogin } from './UsuarioLogin';
import { NotifierService } from 'angular-notifier';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  closeResult: string;
  requestLogin: UsuarioLogin;
  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private httpClient: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

  onSubmit(value: any) {
    event.preventDefault();
    this.requestLogin = new UsuarioLogin(value.username, value.senha);
    console.log(this.requestLogin);
    this.httpClient.post('http://monica:64803/api/Login', this.requestLogin, {observe: 'response'})
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.notifier.notify( 'error', 'Não foi possível logar. Por favor, tente novamente' );
          console.log(err);
        }
      );
  }

}
