import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Usuario } from "./usuario";
import { map } from "rxjs/operators";
import { IdResponse } from "./idResponse";

@Component({
  selector: "app-cadastro-form",
  templateUrl: "./cadastro-form.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./cadastro-form.component.scss"]
})
export class CadastroFormComponent {
  closeResult: string;
  user: Usuario;
  modal: any;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.notifier = notifierService;
  }

  openVerticallyCentered(content) {
    this.modal = this.modalService.open(content, {
      windowClass: "dark-modal",
      centered: true
    });
  }

  onSubmit(value: any) {
    event.preventDefault();
    this.spinner.show();
    this.user = new Usuario(
      value.nome,
      value.username,
      value.email,
      value.password
    );
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
            this.modal.close();
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
