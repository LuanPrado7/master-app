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
  tempSkin = '';
  private readonly notifier: NotifierService;

  constructor(
    private modalService: NgbModal,
    notifierService: NotifierService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(){
    this.httpClient
      .get(`http://monica:64803/api/Usuario/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          console.log(res.body);
          this.userSkin = res.body.Skin;
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

  openVerticallyCentered(content) {
    this.onOpenModal(content);
  }

  onOpenModal(content) {
    this.spinner.show();
    this.modal = this.modalService.open(content, {
      centered: true
    });
  }

  changeSkin(value: any) {
    event.preventDefault();
    this.spinner.show();
    this.httpClient
      .get(`http://monica:64803/api/Usuario/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          res.body.Skin = value;
          console.log(res.body);
          this.httpClient.put(`http://monica:64803/api/Usuario/`, res.body, {
            observe: "response"
          })
          .subscribe(
            res => {
              this.spinner.hide();
              this.userSkin = value;
            }
          )
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
