import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { map } from "rxjs/operators";

@Component({
  selector: "app-menu-profile",
  templateUrl: "./menu-profile.component.html",
  styleUrls: ["./menu-profile.component.scss"]
})
export class MenuProfileComponent {
  modal: any;
  userSkin = '';
  private readonly notifier: NotifierService;

  constructor(
    private modalService: NgbModal,
    notifierService: NotifierService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    this.httpClient
      .get(`http://monica:64803/api/Usuario/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          console.log(res.body);
          // this.userSkin = res.body.usuario.skin;
        },
        err => {
          setTimeout(() => {
            this.spinner.hide();
            this.notifier.notify(
              "error",
              "Ocorreu um erro. Por favor, tente novamente mais tarde."
            );
          }, 2000);
        }
      );
  }
}
