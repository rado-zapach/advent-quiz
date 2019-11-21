import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'question',
        loadChildren: () => import('./question/question.module').then(m => m.AdventQuizQuestionModule)
      },
      {
        path: 'answer',
        loadChildren: () => import('./answer/answer.module').then(m => m.AdventQuizAnswerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AdventQuizEntityModule {}
