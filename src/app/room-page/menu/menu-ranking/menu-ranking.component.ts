import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { elementProperty } from '@angular/core/src/render3/instructions';

export interface Player {
  foto: string,
  posicao: number,
  username: string,
  pontos: number,
  classificacao: string,
  currentPlayer: boolean
}
@Component({
  selector: 'app-menu-ranking',
  templateUrl: './menu-ranking.component.html',
  styleUrls: ['./menu-ranking.component.scss']
})
export class MenuRankingComponent {

  closeResult: string;
  modal: any;
  data: any;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: NgbModal,
    private httpClient: HttpClient,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  displayedColumns: string[] = ['posicao', 'foto', 'username', 'classificacao', 'pontos'];
  dataSource = [];
  currentPlayer = {};

  openVerticallyCentered(content) {
    this.openRanking(content);
  }

  getStyle(row){
    // console.log(row);
    if(row.currentPlayer){
      return "#a5d6a7";
    }
    return;
  }

  openRanking(content) {
    this.dataSource = [];
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
          this.data = res.body;
          console.log(this.data);
          this.data.ranking.forEach((element, i) => {
            let player: Player = {
              foto: element.Skin,
              posicao: element.Posicao,
              username: element.Username,
              classificacao: element.Classificacao,
              pontos: element.PontosJogada,
              currentPlayer: (this.data.usuario.IdUsuario == element.IdUsuario ? true : false)
            }
            this.dataSource.push(player);
          });
          console.log(this.dataSource.find(x => x.IdUsuario == this.data.usuario.IdUsuario));
          // if(!this.dataSource.find(x => x.IdUsuario == this.data.usuario.IdUsuario)){
          //   console.log(x);
          //   let player: Player = {
          //     foto: this.data.usuario.Skin,
          //     posicao: this.data.usuario.Posicao,
          //     username: this.data.usuario.Username,
          //     classificacao: this.data.usuario.Classificacao,
          //     pontos: this.data.usuario.PontosJogada,
          //     currentPlayer: true
          //   }
          //   this.dataSource.push(player);
          // }
          // this.currentPlayer = this.data.usuario;
          // console.log(this.dataSource);
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
