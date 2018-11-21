import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-page/login-form/login-form.component';
import { CadastroFormComponent } from '../login-page/cadastro-form/cadastro-form.component';
import { LoginPageComponent } from './login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    CadastroFormComponent
  ]
})
export class LoginPageModule { }


