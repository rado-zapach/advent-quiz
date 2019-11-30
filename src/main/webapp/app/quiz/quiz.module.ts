import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnswerModalService } from 'app/quiz/answer/answer-modal.service';
import { AnswerComponent } from 'app/quiz/answer/answer.component';
import { LeaderboardComponent } from 'app/quiz/leaderboard/leaderboard.component';
import { LoginComponent } from 'app/quiz/login/login.component';
import { QuizComponent } from 'app/quiz/quiz.component';
import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { RulesComponent } from 'app/quiz/rules/rules.component';

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
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: {
          pageTitle: 'IBL Advent Quiz Rules'
        }
      }
    ])
  ],
  providers: [AnswerModalService],
  declarations: [QuizComponent, AnswerComponent, LeaderboardComponent, LoginComponent, RulesComponent],
  exports: [QuizComponent, LoginComponent],
  entryComponents: [AnswerComponent]
})
export class QuizModule {}
