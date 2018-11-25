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

  salas(rooms) {
    this.rooms = rooms;
  }

  ngOnInit() {}
}
