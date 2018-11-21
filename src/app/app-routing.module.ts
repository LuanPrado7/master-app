import { Routes, RouterModule } from '@angular/router/';
import { NgModule } from '@angular/core';

import { JogoComponent } from './jogo/jogo.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'jogo', component: JogoComponent},
    {path: '**', component: JogoComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
