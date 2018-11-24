import { Component, OnInit, Input } from "@angular/core";

import { Tema } from "./../tema";
import { Room } from "./room";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  @Input() temas: Tema;
  @Input() rooms: Room;

  roomVariable: boolean = false;

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
  };

  leaveRoom = function() {
    this.roomVariable = false;
  };

  constructor() {}

  ngOnInit() {}
}
