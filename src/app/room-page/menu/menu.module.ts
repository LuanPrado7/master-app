import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { MenuStoreComponent } from "./menu-store/menu-store.component";
import { MenuRankingComponent } from './menu-ranking/menu-ranking.component';

@NgModule({
  imports: [CommonModule, NgxSpinnerModule],
  exports: [MenuStoreComponent, MenuProfileComponent, MenuRankingComponent],
  declarations: [
    MenuStoreComponent, 
    MenuProfileComponent, 
    MenuRankingComponent
  ]
})
export class MenuModule {}
