import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Component } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  modal: any;

  constructor(private modalService: NgbModal) {}

  
}
