import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { RoomComponent } from "./room/room.component";
import { Tema } from "./tema";

export interface GameData {
  idSala: number,
  idNivel: number,
  jogadoresArray: number[]
  numJogadores: number
  idTemaArray: number[],
}
@Component({
  selector: "app-room-page",
  templateUrl: "./room-page.component.html",
  styleUrls: ["./room-page.component.scss"]
})
export class RoomPageComponent implements OnInit {
  @ViewChild(RoomComponent) roomComponent: RoomComponent;
  rooms = [];

  id_usuario = localStorage.getItem('userId');
  websocket: any;

  constructor(
    private router: Router
  ) { }

  salas(rooms) {
    this.rooms = rooms;
  }

  salaCriada(roomCreated) {
    this.rooms.push(roomCreated);
  }


  ngOnInit() {
    const uri = `ws://monica:64803/api/Sala?UsuarioId=${ this.id_usuario }`;

    this.websocket = new WebSocket(uri);

    var _this = this;

    this.websocket.onmessage = (event) => {
      let obj = JSON.parse(event.data);      
      let jaExiste = false;

      for(let i = 0; i < _this.rooms.length; i++) {
        if(_this.rooms[i].Id == obj.Id) {
          _this.rooms.splice(i, 1);
        }
      }

      _this.salaCriada(obj); 

      if(obj.SalaCheia) {
        console.log(obj);
        let gameData: GameData = {
          idNivel: <number>obj.IdNivel,
          idSala: <number>obj.Id,
          idTemaArray: <number[]>obj.Temas,
          jogadoresArray: <number[]>obj.Jogadores,
          numJogadores: <number>obj.JogadoresNaSala
        }
        localStorage.setItem("gameData", JSON.stringify(gameData));
        console.log(this.router);
        this.router.navigate(["/jogo"]);
      }
    };

  }
}
