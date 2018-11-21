import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioLogin } from './UsuarioLogin';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  closeResult: string;
  requestLogin: UsuarioLogin;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

  onSubmit(value: any) {
    event.preventDefault();
    console.log(value);
    this.requestLogin = new UsuarioLogin(value.identifier, value.password);
    console.log(this.requestLogin);
  }

}
