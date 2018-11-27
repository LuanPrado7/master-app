import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
 temas: any[];

  @Output() rooms = new EventEmitter();
  @Output() roomCreated = new EventEmitter();
  // @Output() aparecerSpinner = new EventEmitter<boolean>();


  temaList = [];
  temaLeave = false;
  enabledTema = 'white';
  nv_dificuldade: number;
  nr_jogador: number;
  room = [];
  @Input() websocket: any;

  tema: any;

  id_usuario = localStorage.getItem('userId');

  getTemas() {
    this.httpClient
      .get('http://monica:64803/api/Tema')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        temas => {
          this.temas = temas
            .map(tema => {
              return {
                logo: tema.Icone,
                id_tema: tema.Id,
                titulo: tema.Tema,
                cor: tema.Cor,
                borderColor: 'white',
                backgroundColor: '#cfcfcf'
              }
            });
        }
      );
  }

  getSalas() {
    this.httpClient
      .get('http://monica:64803/api/Sala')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        salas => this.rooms.emit(salas)
      );
  }

  getNomeTema = function (tema) {
    return tema.titulo;
  };

  getLogoTema = function (tema) {
    return 'assets/img/' + tema.logo;
  };

  getStyleTema = function (tema) {
    return tema.cor;
  };

  temaChoice = function (tema) {
    this.temaLeave = false;
    tema.backgroundColor = tema.backgroundColor === tema.cor ? '#cfcfcf' : tema.cor;
    tema.borderColor = 'white';

    if (this.temaList.length < 5) {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === tema.id_tema) {
          this.temaList.splice(i, 1);
          this.temaLeave = true;
          tema.borderColor = 'white';
        }
      }
      if (this.temaLeave === false) {
        this.temaList.push(tema.id_tema);
        tema.borderColor = '#b0b4b7';
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === tema.id_tema) {
          this.temaList.splice(i, 1);
          tema.borderColor = 'white';
        }
      }
    }
  };

  createRoom = function () {
    this.room = {
      NivelId: this.nv_dificuldade,
      TemasIds: this.temaList,
      Jogadores: this.nr_jogador,
      NovaSala: true
    };

    this.nv_dificuldade = '';
    this.temaList = [];
    this.nr_jogador = 0;
    this.temas.forEach(tema => {
      tema.backgroundColor = "#cfcfcf";
    });

    // this.aparecerSpinner.emit(true);

    this.websocket.send(JSON.stringify(this.room));
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getSalas();
    this.getTemas();
  }
}
