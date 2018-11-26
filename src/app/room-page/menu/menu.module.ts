import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { MenuStoreComponent } from "./menu-store/menu-store.component";
import { MenuRankingComponent } from './menu-ranking/menu-ranking.component';
import { MatDialogModule, MatTableModule, MatIconModule } from '@angular/material';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const notifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right"
    },
    vertical: {
      position: "top"
    }
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: false
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease"
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50
    },
    shift: {
      speed: 300,
      easing: "ease"
    },
    overlap: 150
  }
};

@NgModule({
  imports: [CommonModule, NgxSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    NotifierModule,
    NotifierModule.withConfig(notifierOptions)
  ],
  exports: [MenuStoreComponent, MenuProfileComponent, MenuRankingComponent],
  declarations: [
    MenuStoreComponent, 
    MenuProfileComponent, 
    MenuRankingComponent
  ]
})
export class MenuModule {}
