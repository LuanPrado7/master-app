import { Component, OnInit, Input } from '@angular/core';

import { Card } from './card/card';
import { Tema } from '../tema';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input() temas: Tema[];
  @Input() id_jogador: number;
  tempoToken: any;
  
  jogador: Card;

  ranking: Card[] = [
    {
      nome: 'Luan',
      id_jogador: 1,
      foto: 'monkey',
      elo: 'Mestrão',
      pontos_tema : [],
      pontos_total: 0,
      pontos_geral: 0,
      tempoDecorrido: 0
    },
    {
      nome: 'Mônica',
      id_jogador: 3,
      foto: 'detective',
      elo: 'Especialista',
      pontos_tema : [],
      pontos_total: 0,
      pontos_geral: 0,
      tempoDecorrido: 0
    }
  ];

  adicionaPonto: any = function(id_tema, tempo) {
    let tema = this.jogador.pontos_tema.find(tema => tema.id_tema == id_tema);
    tema.pontos++;
    this.jogador.pontos_total++;
    this.jogador.tempoDecorrido += tempo;
    this.atualizarRanking();
  }

  adicionaPontoAdversario: any = function(id_tema, id_jogador) {
    let jogador = this.ranking.find(jogador => jogador.id_jogador == id_jogador);    
    let tema = jogador.pontos_tema.find(tema => tema.id_tema == id_tema);

    tema.pontos++;
    jogador.pontos_total++;
    this.atualizarRanking();
  }

  atualizarRanking = function() {
    this.ranking = this.ranking.sort((a,b) => a.pontos_total < b.pontos_total ? 1 : (a.pontos_total > b.pontos_total ? -1 : 0));
  }

  ligarRankingTema = function() {
    let pontos_tema = this.temas
      .map(tema => {
        return {
          id_tema: tema.id_tema,
          pontos: 0
        }
      })

      
    this.ranking.forEach(jogador => {
      let clone = pontos_tema.map(x => Object.assign({}, x));

      jogador.pontos_tema = clone;
    });
  }

  calcularPontosGerais = function(idNivel) {
    let deParaPontosNivel : any = function(idNivel) {
      return (
        idNivel == 1 ? 10 : (
          idNivel == 2 ? 20 : (
            idNivel == 3 ? 40: (
              idNivel == 4 ? 80 : 0
            )
          )
        )
      )
    }

    this.jogador.pontos_geral = (this.jogador.pontos_total * deParaPontosNivel(idNivel)) + (idNivel * this.jogador.tempoDecorrido);

    return this.jogador.pontos_geral;
  }

  atualizarPontuacaoGeral = function(id_jogador, pontos) {    
    let jogador = this.ranking.find(jogador => jogador.id_jogador == id_jogador); 

    jogador.pontos_geral = pontos;
  }

  constructor() { }

  ngOnInit() {
    this.jogador = this.ranking.find(jogador => jogador.id_jogador == this.id_jogador);    
    this.ligarRankingTema();
  }  

}
