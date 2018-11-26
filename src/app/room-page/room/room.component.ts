import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Tema } from "./../tema";
import { Room } from "./room";
import { map } from "rxjs/operators";
import { Usuario } from "./usuario";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  @Input() temas: Tema[];
  @Input() rooms: Room[];
  @Input() websocket: any;

  roomClick: string;
  roomVariable: boolean = false;

  room: any;
  listaUsuario = [];
  listaTema = [];
  user: any;

  getUsers() {
    this.httpClient
      .get('http://monica:64803/api/Usuario')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        res => {
          res.forEach((element) => {
            let usuario: Usuario = {
              id: element.Id,
              nome: element.Nome,
              username: element.Username,
              email: element.Email,
              senha: element.Senha,
              skin: element.Skin,
              pontos: element.Pontos,
              cadastro: element.Cadastro,
              idclassificacao: element.IdClassificacao,
              classificacao: element.Classificacao
            };
            this.listaUsuario.push(usuario);
          })
        }
      );
  }

  getTemas() {
    this.httpClient
      .get('http://monica:64803/api/Tema')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        res => {
          res.forEach((element) => {
            let tema: Tema = {
              logo: element.Icone,
              id_tema: element.Id,
              titulo: element.Tema,
              cor: element.Cor
            };
            this.listaTema.push(tema);
          })
        }
      );
  }

  getUserPicture(userId) {
    let user = this.listaUsuario.find(
      user => user.id == userId
    );

    return user.skin;
  }

  getUserName(userId) {
    let user = this.listaUsuario.find(
      user => user.id == userId
    );

    return user.nome;
  }

  getNivel(nivelId) {
    return nivelId === 1 ? 'Fácil' : (
      nivelId === 2 ? 'Intermediário' : (
        nivelId === 3 ? 'Difícil' : (
          nivelId === 4 ? 'Mestrão' : 'inválido'
        )
      )
    )
  }

  getUserDescription(userId) {
    let user = this.listaUsuario.find(
      user => user.id == userId
    );

    return user.classificacao;
  }

  getLogoTema = function (temaId) {
    let room_temas = this.listaTema.find(
      room_temas => room_temas.id_tema == temaId
    );

    return "assets/img/" + (room_temas && room_temas.logo);
  };

  getStyleTema = function (temaId) {
    let room_temas = this.listaTema.find(
      room_temas => room_temas.id_tema == temaId
    );
    return room_temas && room_temas.cor;
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
    this.getTemas();
    this.getUsers();
  }
}
