import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card';
import { Tema } from '../../tema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() temas: Tema;

  getStyleTema = function(tema) {

    let tema_atual = this.temas.find(tema_atual => tema_atual.id_tema == tema.id_tema);

    return 'linear-gradient(#a7a7a7 '+ (100 - tema.pontos * 25) +'%, ' + tema_atual.cor + ' 0%)'; 
  }

  getLogoTema = function(tema) {

    let tema_atual = this.temas.find(tema_atual => tema_atual.id_tema == tema.id_tema);

    return 'assets/img/' + tema_atual.logo;
  }

  constructor() { }

  ngOnInit() {
  }

}
