import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-menu-ranking',
  templateUrl: './menu-ranking.component.html',
  styleUrls: ['./menu-ranking.component.scss']
})
export class MenuRankingComponent implements OnInit {

  closeResult: string;
  modal: any;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {
      windowClass: "dark-modal",
      centered: true
    });
  }

  ngOnInit() {
    this.httpClient
      .get(`http://monica:64803/api/Ranking/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          setTimeout(() => {
            this.notifier.notify(
              "error",
              "Não foi possível carregar o ranking. Por favor, tente mais tarde."
            );
          }, 2000);
        }
      );
  }

}
