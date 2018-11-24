import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { JogoModule } from "./jogo/jogo.module";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageModule } from "./login-page/login-page.module";
import { RoomPageModule } from "./room-page/room-page.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    JogoModule,
    BrowserAnimationsModule,
    LoginPageModule,
    RoomPageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
