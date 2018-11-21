import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent {

  closeResult: string;
  user: Usuario;

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

  onSubmit(value: any) {
    event.preventDefault();
    this.user = new Usuario(value.nome, value.username, value.email, value.password);
    this.httpClient.post('https://jsonplaceholder.typicode.com/posts', this.user)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
          } else {
            throw new Error;
          }
        }
      );
  }

}
