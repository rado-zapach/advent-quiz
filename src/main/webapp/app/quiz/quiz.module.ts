import { NgModule } from '@angular/core';
import { QuizComponent } from 'app/quiz/quiz.component';
import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { AnswerModalService } from 'app/quiz/answer/answer-modal.service';
import { AnswerComponent } from 'app/quiz/answer/answer.component';
import { LeaderboardComponent } from 'app/quiz/leaderboard/leaderboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AdventQuizSharedModule,
    RouterModule.forChild([
      {
        path: 'ranking',
        component: LeaderboardComponent,
        data: {
          pageTitle: 'IBL Advent Quiz Ranking'
        }
      }
    ])
  ],
  providers: [AnswerModalService],
  declarations: [QuizComponent, AnswerComponent, LeaderboardComponent],
  exports: [QuizComponent],
  entryComponents: [AnswerComponent]
})
export class QuizModule {}
