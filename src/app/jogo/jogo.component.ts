import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Tema } from './tema';
import { RankingComponent } from './ranking/ranking.component';
import { ResumoDialogComponent } from './resumo/resumo.component';
import { JogoService } from './jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  @ViewChild(RankingComponent) rankingComponent: RankingComponent; 

  temas: Tema[];
  temasCarregado: boolean = false;

  jogoConfig = {
    id_jogador: 4,
    idNivel: 1,
    idsTema: [401, 501, 601, 701, 801]
  }

  atualizarRanking: any = function(obj) {
    this.rankingComponent.adicionaPonto(obj.id_tema, obj.tempo);
  }

  fimDeJogo = function() {
    this.rankingComponent.calcularPontosGerais(this.jogoConfig.idNivel);
    this.abrirResumoPartida();
  }

  abrirResumoPartida: any = function() {
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
    private jogoService: JogoService
  ) { }

  ngOnInit() {
    this.getTemas({
      ids: this.jogoConfig.idsTema
    });
  }

}
