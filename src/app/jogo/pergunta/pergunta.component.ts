import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Pergunta } from './pergunta';
import { Tema } from '../tema';
import { timer, TimeoutError } from 'rxjs';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss']
})
export class PerguntaComponent implements OnInit {

  @Input() temas: Tema[];
  @Output() id_tema_acertado = new EventEmitter<number>();


  pergunta_atual: number;
  timerToken: number;
  timer: number;
  tempoPorPergunta: number = 30;

  perguntas: Pergunta[] = [
    {
      pergunta: "Qual o livro mais vendido no mundo a seguir à Bíblia?",
      id_tema: 2,
      alternativas: [
        {
          alternativa: 'A',
          resposta: 'O Senhor dos Anéis'
        }, {
          alternativa: 'B',
          resposta: 'Dom Quixote'
        }, {
          alternativa: 'C',
          resposta: 'O Pequeno Príncipe'
        }, {
          alternativa: 'D',
          resposta: 'Ela, a Feiticeira'
        }, {
          alternativa: 'E',
          resposta: 'Um Conto de Duas Cidades'
        }
      ],
      correta: 'B'
    },
    {
      pergunta: 'Qual o maior animal terrestre?',
      id_tema: 1,
      alternativas: [
        {
          alternativa: 'A',
          resposta: 'Baleia Azul'
        }, {
          alternativa: 'B',
          resposta: 'Dinossauro'
        }, {
          alternativa: 'C',
          resposta: 'Elefante africano'
        }, {
          alternativa: 'D',
          resposta: 'Tubarão Branco'
        }, {
          alternativa: 'E',
          resposta: 'Girafa'
        }
      ],
      correta: 'A'
    }
  ];

  checarResposta = function(selecionada, pergunta) {
    if(selecionada == pergunta.correta) {
      this.id_tema_acertado.emit(pergunta.id_tema);
    } else {
      alert("Errou");
    }

    this.irParaProximaPergunta();
  }

  irParaProximaPergunta = function() {
    this.stopTimer();

    if(this.pergunta_atual < this.perguntas.length - 1) {
      this.pergunta_atual++;
      this.startTimer();
    }
  }

  getCorTema = function(id_tema) {
    return this.temas.find(tema => tema.id_tema == id_tema).cor;
  }

  startTimer = function() {
    this.timer = 0;

    this.timerToken = setInterval(() => {
      this.timer++;

      if(this.timer == this.tempoPorPergunta) 
        this.irParaProximaPergunta();        

    }, 1000);
  }

  stopTimer = function() {
    clearInterval(this.timerToken);
  }

  constructor() { 
    this.pergunta_atual = 0;
    this.startTimer();
  }

  ngOnInit() {
  }

}
