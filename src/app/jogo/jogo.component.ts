import { Component, OnInit, ViewChild } from '@angular/core';
import { Tema } from './tema';
import { RankingComponent } from './ranking/ranking.component';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  @ViewChild(RankingComponent) ranking: RankingComponent; 

  temas: Tema[] = [
    {
      logo: '',
      id_tema: 1,
      titulo: 'Ciência',
      cor: '#00FF00'
    },
    {
      logo: '',
      id_tema: 2,
      titulo: 'Entreterimento',
      cor:'#FF6EC7'
    },
    {
      logo: '',
      id_tema: 3,
      titulo: 'Harry Potter',
      cor: '#FF0000'
    },
    {
      logo: '',
      id_tema: 4,
      titulo: 'Tecnologia',
      cor: '#0000FF'
    },
    {
      logo: '',
      id_tema: 5,
      titulo: 'Música',
      cor: '#FF7F00'
    }
  ];

  id_jogador: number = 4;

  atualizarRanking: any = function(id_tema) {
    this.ranking.adicionaPonto(id_tema);
  }

  constructor() { }

  ngOnInit() {
  }

}
