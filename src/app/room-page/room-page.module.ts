import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoomPageComponent } from "./room-page.component";
import { RoomComponent } from "./room/room.component";
import { OptionComponent } from "./option/option.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RoomPageComponent, RoomComponent, OptionComponent]
})
export class RoomPageModule {}
