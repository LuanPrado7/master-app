import { Component, OnInit, ViewChild } from "@angular/core";

import { RoomComponent } from "./room/room.component";
import { Tema } from "./tema";

@Component({
  selector: "app-room-page",
  templateUrl: "./room-page.component.html",
  styleUrls: ["./room-page.component.scss"]
})
export class RoomPageComponent implements OnInit {
  @ViewChild(RoomComponent) roomComponent: RoomComponent;
  rooms = [];

  teste(rooms) {
    this.rooms = rooms;
    console.log(this.rooms);
  }

  temas: Tema[] = [
    {
      logo: "dna.png",
      id_tema: 1,
      titulo: "Biologia",
      cor: "#00FF00"
    },
    {
      logo: "game-controller.png",
      id_tema: 2,
      titulo: "Games",
      cor: "#FF6EC7"
    },
    {
      logo: "innovation.png",
      id_tema: 3,
      titulo: "Tecnologia",
      cor: "#FF0000"
    },
    {
      logo: "sphinx.png",
      id_tema: 4,
      titulo: "História",
      cor: "#0000FF"
    },
    {
      logo: "popcorn.png",
      id_tema: 5,
      titulo: "Filmes",
      cor: "#FF7F00"
    }
  ];
  ngOnInit() {}
}
