import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu-store",
  templateUrl: "./menu-store.component.html",
  styleUrls: ["./menu-store.component.scss"]
})
export class MenuStoreComponent {
  modal: any;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content) {
    this.modal = this.modalService.open(content, {
      centered: true,
      size: "lg"
    });
  }
}
