import { MenuModule } from "./menu/menu.module";
import { MenuStoreComponent } from "./menu/menu-store/menu-store.component";
import { MenuProfileComponent } from "./menu/menu-profile/menu-profile.component";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoomPageComponent } from "./room-page.component";
import { RoomComponent } from "./room/room.component";
import { OptionComponent } from "./option/option.component";
import { MenuComponent } from "./menu/menu.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DoScrollDirective } from "../directives/do-scroll-directive";

@NgModule({
  imports: [CommonModule, FormsModule, MenuModule, NgbModule],
  declarations: [
    RoomPageComponent,
    RoomComponent,
    OptionComponent,
    MenuComponent,
    DoScrollDirective
  ]
})
export class RoomPageModule {}
