import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent {

  @Output() vartestes = new EventEmitter<any>();

  closeResult: string;
  user: Usuario;
  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private httpClient: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

  onSubmit(value: any) {
    event.preventDefault();
    this.user = new Usuario(value.nome, value.username, value.email, value.password);
    this.httpClient.post('http://monica:64803/api/Usuario', this.user, {observe: 'response'})
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.notifier.notify( 'error', 'Não foi possível cadastrar. Por favor, tente novamente' );
          console.log(err);
        }
      );
  }

}
