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
      logo: 'dna.png',
      id_tema: 1,
      titulo: 'Biologia',
      cor: '#00FF00'
    },
    {
      logo: 'game-controller.png',
      id_tema: 2,
      titulo: 'Games',
      cor:'#FF6EC7'
    },
    {
      logo: 'innovation.png',
      id_tema: 3,
      titulo: 'Tecnologia',
      cor: '#FF0000'
    },
    {
      logo: 'sphinx.png',
      id_tema: 4,
      titulo: 'História',
      cor: '#0000FF'
    },
    {
      logo: 'popcorn.png',
      id_tema: 5,
      titulo: 'Filmes',
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
