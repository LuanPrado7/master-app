import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { JogoModule } from "./jogo/jogo.module";
import { AppRoutingModule } from "./app-routing.module";
import { LoginPageModule } from "./login-page/login-page.module";
import { RoomPageModule } from "./room-page/room-page.module";
import { MenuModule } from "./room-page/menu/menu.module";

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
        FormsModule,
        MenuModule,
        BrowserAnimationsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
