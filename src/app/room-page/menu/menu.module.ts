import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { MenuStoreComponent } from "./menu-store/menu-store.component";

@NgModule({
  imports: [CommonModule, NgxSpinnerModule],
  exports: [MenuStoreComponent, MenuProfileComponent],
  declarations: [MenuStoreComponent, MenuProfileComponent]
})
export class MenuModule {}
