import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Tema } from "./../tema";
import { Room } from "./room";
import { map } from "rxjs/operators";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  @Input() temas: Tema;
  @Input() rooms: Room[];
  @Input() websocket: any;

  roomClick: string;
  roomVariable: boolean = false;

  room: any;
  user: any[];
  tema: any[];

  getTemaStyle(id) {

  }

  getTemas() {
    this.httpClient
      .get('http://monica:64803/api/Tema')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        tema => {
          this.tema = tema
            .map(tema => {
              return {
                logo: tema.Icone,
                id_tema: tema.Id,
                titulo: tema.Tema,
                cor: tema.Cor
              }
            });
        }
      );
  }

  getUsers() {
    this.httpClient
      .get('http://monica:64803/api/Usuario')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        user => {
          this.user = user
            .map(user => {
              return {
                Id: user.Id,
                Nome: user.Nome,
                Username: user.Username,
                Email: user.Email,
                Senha: user.Senha,
                Pontos: user.Pontos,
                IdClassificacao: user.IdClassificacao
              }
            });
        }
      );
  }

  getLogoTema = function (temaId) {
    let room_temas = this.tema.find(
      room_temas => room_temas.id_tema == temaId
    );

    return "assets/img/" + room_temas.logo;
  };

  getStyleTema = function (tema) {
    let room_temas = this.tema.find(
      room_temas => room_temas.id_tema == tema.id_tema
    );

    return room_temas.cor;
  };

  enterRoom = function () {
    if (!this.currentRoom) return false;

    for (let i = 0; i < this.currentRoom.Jogadores.length; i++) {
      if (this.currentRoom.Jogadores[i] == this.id_usuario) {
        return false;
      }
    }

    this.roomVariable = true;
    this.room = {
      SalaId: this.currentRoom.Id,
      UsuarioId: this.id_usuario,
      NovaSala: false
    };

    this.websocket.send(JSON.stringify(this.room));
  }

  leaveRoom = function () {
    this.roomVariable = false;
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getUsers();
    this.getTemas();
  }
}
