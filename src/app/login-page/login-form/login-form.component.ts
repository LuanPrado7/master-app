import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsuarioLogin } from "./UsuarioLogin";
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  closeResult: string;
  requestLogin: UsuarioLogin;
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
      centered: true
    });
  }

  onSubmit(value: any) {
    event.preventDefault();
    if (value.username == "" || value.senha == "") {
      this.notifier.notify(
        "error",
        "Todos os dados são obrigatórios. Por favor, tente novamente"
      );
    } else {
      this.spinner.show();
      this.requestLogin = new UsuarioLogin(value.username, value.senha);
      this.httpClient
        .post("http://monica:64803/api/Login", this.requestLogin, {
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
}
