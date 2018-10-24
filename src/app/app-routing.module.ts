import { Routes, RouterModule } from '@angular/router/';
import { NgModule } from '@angular/core';

import { JogoComponent } from './jogo/jogo.component';

const routes: Routes = [
    {path: 'jogo', component: JogoComponent},
    {path: '**', component: JogoComponent}
]

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