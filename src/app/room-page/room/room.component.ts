import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Tema } from "./../tema";
import { Room } from "./room";

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

  currentRoom: any;
  id_usuario = localStorage.getItem('userId');

  getTemas = function() {
    this.httpClient.get('http://monica:64803/api/Tema')
    .subscribe(
      res => {
        this.tema = res;
      }
    );
  };
 
  getLogoTema = function(tema) {
    let room_temas = this.temas.find(
      room_temas => room_temas.id_tema == tema.id_tema
    );

    return "assets/img/" + room_temas.logo;
  };

  getStyleTema = function(tema) {
    let room_temas = this.temas.find(
      room_temas => room_temas.id_tema == tema.id_tema
    );

    return room_temas.cor;
  };

  enterRoom = function() {
    if(!this.currentRoom) return false;

    for(let i = 0; i < this.currentRoom.Jogadores.length; i++) {
      if(this.currentRoom.Jogadores[i] == this.id_usuario) {
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

  leaveRoom = function() {
    this.roomVariable = false;
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
  }
}
