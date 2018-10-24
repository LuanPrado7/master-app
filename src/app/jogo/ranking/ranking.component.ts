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
      foto: 'https://pbs.twimg.com/profile_images/1053055123193122816/IUwo6l_Q_400x400.jpg',
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
      ]
    },
    {
      nome: 'Leilah',
      id_jogador: 2,
      foto: 'https://s3.amazonaws.com/uifaces/faces/twitter/sdw/128.jpg',
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
      ]
    },
    {
      nome: 'Mônica',
      id_jogador: 3,
      foto: 'https://s3.amazonaws.com/uifaces/faces/twitter/rogie/128.jpg',
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
      ]
    },
    {
      nome: 'Pamela',
      id_jogador: 4,
      foto: 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg',
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
      ]
    }
  ];

  adiciona_ponto: any = function(id_tema) {
    let tema = this.jogador.pontos_tema.find(tema => tema.id_tema == id_tema);
    tema.pontos++;
  }

  constructor() { }

  ngOnInit() {
    this.jogador = this.ranking.find(jogador => jogador.id_jogador == this.id_jogador);
  }  

}
