import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Tema } from "./../tema";
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: "app-option",
  templateUrl: "./option.component.html",
  styleUrls: ["./option.component.scss"]
})
export class OptionComponent implements OnInit {
  @Input() temas: Tema[];
  @Output() rooms = new EventEmitter();

  oneDisabled = false;
  twoDisabled = false;
  threeDisabled = false;
  fourDisabled = false;
  temaList = [];
  temaLeave = false;
  enabledTema = "white";
  nv_dificuldade: number;
  nr_jogador: number;
  room = [];
  websocket: any;

  tema: any;

  id = localStorage.getItem('userId');


  getTemas = function() {
    this.httpClient.get('http://monica:64803/api/Tema')
    .subscribe(
      res => {
        this.tema = res;
      }
    );
  };

  getLogoTema = function(tema) {
    return "assets/img/" + tema.Icone;
  };

  getStyleTema = function(tema) {
    return tema.Cor;
  };

  temaChoice = function(id) {
    this.temaLeave = false;
    this.enabledTema = false;
    if (this.temaList.length < 5) {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === id) {
          this.temaList.splice(i, 1);
          this.temaLeave = true;
          this.enabledTema = "white";
        }
      }
      if (this.temaLeave === false) {
        this.temaList.push(id);
        this.enabledTema = "#b0b4b7";
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === id) {
          this.temaList.splice(i, 1);
          this.enabledTema = "white";
        }
      }
    }
    console.log(this.temaList);
  };

  difficultyFilter = function(number) {
    if (number === 1) {
      this.twoDisabled = !this.twoDisabled;
      this.threeDisabled = !this.threeDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number === 2) {
      this.oneDisabled = !this.oneDisabled;
      this.threeDisabled = !this.threeDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number === 3) {
      this.oneDisabled = !this.oneDisabled;
      this.twoDisabled = !this.twoDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number === 4) {
      this.oneDisabled = !this.oneDisabled;
      this.twoDisabled = !this.twoDisabled;
      this.threeDisabled = !this.threeDisabled;
    }
    this.nv_dificuldade = number;
  };

  createRoom = function() {
    this.room = {
        NivelId: this.nv_dificuldade,
        TemasIds: this.temaList,
        Jogadores: this.nr_jogador,
        NovaSala: true
      };

      this.websocket.send(JSON.stringify(this.room));

      this.websocket.onmessage = function(event) {
        console.log(event.data);
      };
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const uri = `ws://monica:64803/api/Sala?UsuarioId=${ this.id }`;

    this.websocket = new WebSocket(uri);

    this.websocket.onopen = () => {
      this.websocket.send('getsalas');
    };

    var _this = this;

    this.websocket.onmessage = function(event) {
      _this.rooms.emit(JSON.parse(event.data));
    };
    this.getTemas();
  }
}
