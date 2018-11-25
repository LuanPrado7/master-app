import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatTableModule, MatIconModule } from '@angular/material';

import { JogoComponent } from './jogo.component';
import { RankingComponent } from './ranking/ranking.component';
import { CardComponent } from './ranking/card/card.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { ResumoDialogComponent } from './resumo/resumo.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    NgxSpinnerModule
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
    PerguntaComponent, 
    ResumoDialogComponent
  ],
  entryComponents: [
      ResumoDialogComponent
  ]
})
export class JogoModule { }
