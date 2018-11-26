import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

import { Pergunta } from './pergunta';
import { Tema } from '../tema';

import * as $ from 'jquery';
import { PerguntaService } from './pergunta.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss']
})
export class PerguntaComponent implements OnInit {

  @Input() temas: Tema[];
  @Input() jogoConfig;
  @Output() idTemaAcertado = new EventEmitter<any>();
  @Output() abrir_resumo_partida = new EventEmitter<any>();

  perguntaAtual: number;
  timerToken: number;
  timer: number;
  tempoPorPergunta: number = 1000000;
  qtdPerguntas: number = 20;
  tempoDeJogo: number = this.tempoPorPergunta * this.qtdPerguntas;
  block_perguntas: boolean = false;
  perguntasCarregadas: boolean = false

  perguntas: Pergunta[] = [];

  checarResposta = function(alternativa, letra, pergunta) {

    if(this.block_perguntas) return;

    this.block_perguntas = true;
   
    if(alternativa.Correta) {
      this.idTemaAcertado.emit({
        id_tema: pergunta.IdTema, 
        tempo: this.timer
      });
    } else {
      $("#option-" + letra)
        .addClass("errada");
    }

    this.stopTimer();

    setTimeout(() => {
      $("#option-" + letra)
        .removeClass("errada");

      this.irParaProximaPergunta();
    }, 1000)
  }

  getLetraAlternativa: any = function(i) {
    return (
      i == 0 ? 'A' : (
        i == 1 ? 'B': (
          i == 2 ? 'C': (
            i == 3 ? 'D': (
              i == 4 ? 'E' : ''
            )
          )
        )
      )
    )
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

      this.block_perguntas = false;
    }
    else {
      this.abrir_resumo_partida.emit();
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

  getPerguntas = function(params) {
    this.perguntaService.getPerguntas(params)
      .subscribe(
        perguntas => {
          this.perguntas = perguntas

          this.perguntasCarregadas = true;
        },
        errors => {

        }
      )
  }

  constructor(
    private perguntaService: PerguntaService
  ) {
  }

  ngOnInit() {
    this.perguntaAtual = 0;
    this.startTimer();

    this.getPerguntas({
      idNivel: this.jogoConfig.idNivel,
      idsTema: this.jogoConfig.idsTema
    })
  }

}
