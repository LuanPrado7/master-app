import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { MenuStoreComponent } from "./menu-store/menu-store.component";
import { MenuRankingComponent } from './menu-ranking/menu-ranking.component';
import { MatDialogModule, MatTableModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, NgxSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule],
  exports: [MenuStoreComponent, MenuProfileComponent, MenuRankingComponent],
  declarations: [
    MenuStoreComponent, 
    MenuProfileComponent, 
    MenuRankingComponent
  ]
})
export class MenuModule {}
