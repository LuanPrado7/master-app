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
  pontGeral: number
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

  voltarMenu = function() {
    this.router.navigate(["/room"])
  }

  ngOnInit() {
    this.data.forEach((element, i) => {
      let player: Player = {
        foto: element.foto,
        posicao: i + 1,
        nome: element.nome,
        elo: element.elo,
        pontPartida: element.pontos_total,
        pontGeral: element.pontos_geral
      }
      this.httpClient
        .get(`http://monica:64803/api/Usuario/${localStorage.getItem('userId')}`, {
          observe: "response"
        })
        .pipe(map(res => res as any))
        .subscribe(
          res => {
            res.body.Pontos = player.pontGeral;
            console.log(res.body);
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


      this.dataSource.push(player)
    });
  }
}
