import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Tema } from './tema';
import { RankingComponent } from './ranking/ranking.component';
import { ResumoDialogComponent } from './resumo/resumo.component';
import { JogoService } from './jogo.service';
import { NgxSpinnerService } from "ngx-spinner";

export interface JogoConfig {
  idSala: number,
  idJogador: number,
  idNivel: number,
  idsTema: number[]
}

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  @ViewChild(RankingComponent) rankingComponent: RankingComponent;

  temas: Tema[];
  temasCarregado: boolean = false;
  webSocket: any;
  gameData: {};
  jogoConfig = {
    idSala: 1,
    idJogador: 1,
    idNivel: 1,
    idsTema: [401, 501, 301]
  }

  qtdJogadoresFim: number;
  qtdJogadores: number;

  atualizarRanking: any = function (obj) {
    this.webSocket.send(JSON.stringify({
      idSala: this.jogoConfig.idSala,
      idTema: obj.id_tema,
      finalizou: false,
    }));

    this.rankingComponent.adicionaPonto(obj.id_tema, obj.tempo);
  }

  fimDeJogo = function () {
    this.webSocket.send(JSON.stringify({
      idSala: this.jogoConfig.idSala,
      finalizou: true,
      pontos: this.rankingComponent.calcularPontosGerais(this.jogoConfig.idNivel)
    }));

    this.spinner.show();
  }

  abrirResumoPartida: any = function () {
    this.resumoDialog.open(ResumoDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.rankingComponent.ranking
    });
  }

  getTemas(params) {
    this.jogoService.getTemas(params)
      .subscribe(
        temas => {
          this.temas = temas
            .map(tema => {
              return {
                logo: tema.Icone,
                id_tema: tema.Id,
                titulo: tema.Tema,
                cor: tema.Cor
              } as Tema
            })

          this.temasCarregado = true;
        },
        errors => console.log(errors)
      )
  }



  constructor(
    public resumoDialog: MatDialog,
    private jogoService: JogoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    let gameData = JSON.parse(localStorage.getItem("gameData"));
    let importConfig: JogoConfig = {
      idsTema: gameData.idTemaArray,
      idNivel: gameData.idNivel,
      idJogador: parseInt(localStorage.getItem("userId")),
      idSala: gameData.idSala
    };
    this.jogoConfig = importConfig;
    this.getTemas({
      ids: this.jogoConfig.idsTema
    });

    this.qtdJogadoresFim = 0;
    this.qtdJogadores = gameData.numJogadores;

    this.webSocket = new WebSocket("ws://monica:64803/api/Partida?UsuarioId=" + this.jogoConfig.idJogador);

    var _this = this;

    this.webSocket.onmessage = function (event) {
      var obj = JSON.parse(event.data);

      if (!obj.Finalizou && _this.jogoConfig.idJogador != obj.IdUsuario) {
        _this.rankingComponent.adicionaPontoAdversario(obj.IdTema, obj.IdUsuario);
      }

      if (obj.Finalizou) {
        _this.rankingComponent.atualizarPontuacaoGeral(obj.IdUsuario, obj.Pontos);
        _this.qtdJogadoresFim++;

        if (_this.qtdJogadores == _this.qtdJogadoresFim) {
          _this.spinner.hide();
          _this.abrirResumoPartida();
        }
      }
    }

  }

}
