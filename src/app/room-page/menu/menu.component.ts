import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  modal: any;
  light: boolean;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(){
    this.light = false;
    setInterval(() => {
      this.light = !this.light;
    }, 1500)
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
