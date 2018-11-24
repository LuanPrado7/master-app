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

  roomClick: string;
  roomVariable: boolean = false;

  room: any;

  getSalas = function() {
    // this.httpClient.get('http://monica:64803/api/Sala')
    // .subscribe(
    //   res => {
    //     this.room = res;
    //   });
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
    this.roomVariable = true;
    this.room = {
      NivelId: this.nv_dificuldade,
      TemasIds: this.temaList,
      Jogadores: this.nr_jogador,
      NovaSala: false
    };

    this.websocket.send(JSON.stringify(this.room));

    this.websocket.onmessage = function(event) {
      console.log(event.data);
    };
  };

  leaveRoom = function() {
    this.roomVariable = false;
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // this.getSalas();
    console.log(this.rooms);
  }
}
