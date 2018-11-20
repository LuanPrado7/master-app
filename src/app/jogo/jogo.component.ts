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

  id_jogador: number = 4;

  atualizarRanking: any = function(idTema) {
    this.rankingComponent.adicionaPonto(idTema);
  }

  abrirResumoPartida: any = function() {
    this.resumoDialog.open(ResumoDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.rankingComponent.ranking
    });
  }

  getTemas() {
    this.jogoService.getTemas()
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
    this.getTemas();
  }

}
