import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Tema } from "./../tema";

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

  getLogoTema = function(tema) {
    return "assets/img/" + tema.logo;
  };

  getStyleTema = function(tema) {
    return tema.cor;
  };

  temaChoice = function(id) {
    this.temaLeave = false;
    this.enabledTema = false;
    if (this.temaList.length < 5) {
      for (var i = 0; i < 5; i++) {
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
      for (var i = 0; i < 5; i++) {
        if (this.temaList[i] === id) {
          this.temaList.splice(i, 1);
          this.enabledTema = "white";
        }
      }
    }
    console.log(this.temaList);
  };

  difficultyFilter = function(number) {
    if (number == 1) {
      this.twoDisabled = !this.twoDisabled;
      this.threeDisabled = !this.threeDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number == 2) {
      this.oneDisabled = !this.oneDisabled;
      this.threeDisabled = !this.threeDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number == 3) {
      this.oneDisabled = !this.oneDisabled;
      this.twoDisabled = !this.twoDisabled;
      this.fourDisabled = !this.fourDisabled;
    } else if (number == 4) {
      this.oneDisabled = !this.oneDisabled;
      this.twoDisabled = !this.twoDisabled;
      this.threeDisabled = !this.threeDisabled;
    }
    this.nv_dificuldade = number;
  };

  createRoom = function() {
    this.room = [
      {
        id_room: 1,
        nv_dificuldade: this.nv_dificuldade,
        nome: "Pâmela",
        id_jogador: 1,
        foto: "hippie",
        elo: "Mestre",
        nr_jogador: this.nr_jogador,
        temas: [
          {
            id_tema: this.temaList[0]
          },
          {
            id_tema: this.temaList[1]
          },
          {
            id_tema: this.temaList[2]
          },
          {
            id_tema: this.temaList[3]
          },
          {
            id_tema: this.temaList[4]
          }
        ]
      }
    ];
    console.log(this.room);
    this.rooms.emit(this.room);
  };

  constructor() {}

  ngOnInit() {}
}
