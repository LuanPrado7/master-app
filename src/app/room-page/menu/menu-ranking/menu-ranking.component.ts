import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface Player {
  foto: string,
  posicao: number,
  username: string,
  pontos: number,
  classificacao: string
}
@Component({
  selector: 'app-menu-ranking',
  templateUrl: './menu-ranking.component.html',
  styleUrls: ['./menu-ranking.component.scss']
})
export class MenuRankingComponent {

  closeResult: string;
  modal: any;
  private readonly notifier: NotifierService;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  openVerticallyCentered(content) {
    this.openRanking(content);
  }

  openRanking(content) {
    this.httpClient
      .get(`http://monica:64803/api/Ranking/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          this.modalService.open(content, {
            windowClass: "dark-modal",
            centered: true,
            size: 'lg'
          });
          console.log(res.body);
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
