import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-page/login-form/login-form.component';
import { CadastroFormComponent } from '../login-page/cadastro-form/cadastro-form.component';
import { LoginPageComponent } from './login-page.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    CadastroFormComponent
  ]
})
export class LoginPageModule { }
