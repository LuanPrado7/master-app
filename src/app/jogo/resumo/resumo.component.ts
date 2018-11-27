import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Player {
  foto: string,
  posicao: number,
  nome: string,
  elo: string,
  pontPartida: number,
  pontGeral: number,
  userId: number
}

@Component({
  selector: 'app-dialog-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private httpClient: HttpClient) {}

  displayedColumns: string[] = ['posicao', 'foto', 'nome', 'elo', 'pontPartida', 'pontGeral'];
  dataSource = [];
  audio = new Audio();

  voltarMenu = function() {
    this.audio.pause();
    localStorage.removeItem("gameData");
    this.router.navigate(["/room"])
  }

  ngOnInit() {
    this.audio.src = '../../assets/audio/final-ranking.mpeg';
    this.audio.load();
    this.audio.play();

    this.data.forEach((element, i) => {
      let player: Player = {
        foto: element.foto,
        posicao: i + 1,
        nome: element.nome,
        elo: element.elo,
        pontPartida: element.pontos_total,
        pontGeral: element.pontos_geral,
        userId: element.id_jogador
      }
      this.dataSource.push(player)
    });
    let currentPlayer = this.data.find(jogador => jogador.id_jogador == parseInt(localStorage.getItem('userId')));
    this.httpClient
      .get(`http://monica:64803/api/Usuario/${localStorage.getItem('userId')}`, {
        observe: "response"
      })
      .pipe(map(res => res as any))
      .subscribe(
        res => {
          console.log(res.body);
          res.body.Pontos = res.body.Pontos + currentPlayer.pontos_geral;
          console.log(res);
          this.httpClient.put(`http://monica:64803/api/Usuario/`, res.body, {
            observe: "response"
          })
          .subscribe(
            res => {
              console.log(res);
            }
          )
        },
        err => {
          console.log(err);
        }
      );
  }
}
