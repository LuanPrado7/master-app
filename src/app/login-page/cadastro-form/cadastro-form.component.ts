import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent {

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

}
