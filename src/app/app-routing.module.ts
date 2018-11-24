import { Routes, RouterModule } from "@angular/router/";
import { NgModule } from "@angular/core";

import { JogoComponent } from "./jogo/jogo.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RoomPageComponent } from "./room-page/room-page.component";

const routes: Routes = [
  { path: "", component: LoginPageComponent },
  { path: "jogo", component: JogoComponent },
  { path: "room", component: RoomPageComponent },
  { path: "**", component: JogoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
