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
  gameData:any;
  jogoConfig: any;

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
    this.gameData = JSON.parse(localStorage.getItem("gameData"));

    let importConfig: JogoConfig = {
      idsTema: this.gameData.idTemaArray,
      idNivel: this.gameData.idNivel,
      idJogador: parseInt(localStorage.getItem("userId")),
      idSala: this.gameData.idSala
    };

    this.jogoConfig = importConfig;

    this.getTemas({
      ids: this.jogoConfig.idsTema
    });

    this.qtdJogadoresFim = 0;
    this.qtdJogadores = this.gameData.numJogadores;

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
          _this.rankingComponent.ranking = _this.rankingComponent.ranking.sort((a, b) => a.pontos_geral < b.pontos_geral ? 1 : (a.pontos_geral > b.pontos_geral ? -1 : 0));

          _this.rankingComponent.ranking[0].pontos_geral = (
            _this.gameData.idNivel == 1 ? (_this.rankingComponent.ranking[2].pontos_geral + 50) : (
              _this.gameData.idNivel == 2 ? (_this.rankingComponent.ranking[2].pontos_geral + 100) : (
                _this.gameData.idNivel == 3 ? (_this.rankingComponent.ranking[2].pontos_geral + (200 * 1000)) : (
                  _this.gameData.idNivel == 4 ? (_this.rankingComponent.ranking[2].pontos_geral + 400) : 0
                )
              )
            )
          )

          _this.spinner.hide();
          _this.abrirResumoPartida();
        }
      }
    }

  }

}
