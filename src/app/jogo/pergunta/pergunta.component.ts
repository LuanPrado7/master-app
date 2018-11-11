import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

import { Pergunta } from './pergunta';
import { Tema } from '../tema';

import * as $ from 'jquery';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss']
})
export class PerguntaComponent implements OnInit {

  @Input() temas: Tema[];
  @Output() id_tema_acertado = new EventEmitter<number>();
  @Output() abrir_resumo_partida = new EventEmitter<any>();

  perguntaAtual: number;
  timerToken: number;
  timer: number;
  tempoPorPergunta: number = 15;

  perguntas: Pergunta[] = [
    {
      pergunta: "Qual o livro mais vendido no mundo a seguir à Bíblia?",
      id_tema: 4,
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
    $("#option-" + pergunta.correta).addClass("correta");
    
    if(selecionada == pergunta.correta) {
      this.id_tema_acertado.emit(pergunta.id_tema);
    } else {
      $("#option-" + selecionada).addClass("errada");
    }

    this.stopTimer();

    setTimeout(() => {
      $("div[id ~= 'option']")
        .removeClass("correta")
        .removeClass("errada");

      this.irParaProximaPergunta();
    }, 1000)
  }

  restartCircleAnimation() {
    let circleTimer = document.getElementById('circle-timer');
    
    circleTimer
      .classList
      .remove("circle-animation")

    circleTimer.offsetWidth;

    setTimeout(() => {
      circleTimer
        .classList
        .add("circle-animation") 
    }, 100)
  }

  irParaProximaPergunta = function() {

    this.restartCircleAnimation();

    if(this.perguntaAtual < this.perguntas.length - 1) {
      this.perguntaAtual++;
      this.startTimer();
    }
    else {
      // this.abrir_resumo_partida.emit();
      $("#circle-timer").addClass("circle-animation-paused");
    }
  }

  getCorTema = function(id_tema) {
    return this.temas.find(tema => tema.id_tema == id_tema).cor;
  }

  startTimer = function() {
    this.timer = this.tempoPorPergunta;

    this.timerToken = setInterval(() => {
      this.timer--;

      if(this.timer == 0) {
        this.stopTimer();
        this.irParaProximaPergunta();        
      }

    }, 1000);
  }

  stopTimer = function() {
    clearInterval(this.timerToken);
  }

  constructor() { 
    this.perguntaAtual = 0;
    this.startTimer();
  }

  ngOnInit() {
  }

}
