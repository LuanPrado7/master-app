import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

}
