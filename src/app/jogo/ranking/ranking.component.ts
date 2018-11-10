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
  
  jogador: Card;

  ranking: Card[] = [
    {
      nome: 'Luan',
      id_jogador: 1,
      foto: 'monkey',
      elo: 'Mestrão',
      pontos_tema : [
        {
          id_tema: 1,
          pontos: 0
        },
        {
          id_tema: 2,
          pontos: 0
        },
        {
          id_tema: 3,
          pontos: 0
        },
        {
          id_tema: 4,
          pontos: 0
        },
        {
          id_tema: 5,
          pontos: 0
        }
      ],
      pontos_total: 0
    },
    {
      nome: 'Leilah',
      id_jogador: 2,
      foto: 'hipster-1',
      elo: 'Sabixão',
      pontos_tema : [
        {
          id_tema: 1,
          pontos: 0
        },
        {
          id_tema: 2,
          pontos: 0
        },
        {
          id_tema: 3,
          pontos: 0
        },
        {
          id_tema: 4,
          pontos: 0
        },
        {
          id_tema: 5,
          pontos: 0
        }
      ],
      pontos_total: 0
    },
    {
      nome: 'Mônica',
      id_jogador: 3,
      foto: 'detective',
      elo: 'Especialista',
      pontos_tema : [
        {
          id_tema: 1,
          pontos: 0
        },
        {
          id_tema: 2,
          pontos: 0
        },
        {
          id_tema: 3,
          pontos: 0
        },
        {
          id_tema: 4,
          pontos: 0
        },
        {
          id_tema: 5,
          pontos: 0
        }
      ],
      pontos_total: 0
    },
    {
      nome: 'Pamela',
      id_jogador: 4,
      foto: 'hippie',
      elo: 'Principiante',
      pontos_tema : [
        {
          id_tema: 1,
          pontos: 0
        },
        {
          id_tema: 2,
          pontos: 0
        },
        {
          id_tema: 3,
          pontos: 0
        },
        {
          id_tema: 4,
          pontos: 0
        },
        {
          id_tema: 5,
          pontos: 0
        }
      ],
      pontos_total: 0
    }
  ];

  adicionaPonto: any = function(id_tema) {
    let tema = this.jogador.pontos_tema.find(tema => tema.id_tema == id_tema);
    tema.pontos++;
    this.jogador.pontos_total++;
    this.atualizarRanking();
  }

  atualizarRanking = function() {
    this.ranking = this.ranking.sort((a,b) => a.pontos_total < b.pontos_total ? 1 : (a.pontos_total > b.pontos_total ? -1 : 0));
  }

  constructor() { }

  ngOnInit() {
    this.jogador = this.ranking.find(jogador => jogador.id_jogador == this.id_jogador);
  }  

}
