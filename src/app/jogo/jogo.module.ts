import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoComponent } from './jogo.component';
import { RankingComponent } from './ranking/ranking.component';
import { CardComponent } from './ranking/card/card.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { TimerComponent } from './pergunta/timer/timer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    JogoComponent,
    RankingComponent,
    CardComponent,
    PerguntaComponent
  ],
  declarations: [
    RankingComponent,
    CardComponent, 
    JogoComponent, 
    PerguntaComponent, TimerComponent
  ]
})
export class JogoModule { }
