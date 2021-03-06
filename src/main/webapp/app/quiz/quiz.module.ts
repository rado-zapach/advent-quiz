import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnswerModalService } from 'app/quiz/answer/answer-modal.service';
import { AnswerComponent } from 'app/quiz/answer/answer.component';
import { LeaderboardComponent } from 'app/quiz/leaderboard/leaderboard.component';
import { LoginComponent } from 'app/quiz/login/login.component';
import { QuizComponent } from 'app/quiz/quiz.component';
import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { RulesComponent } from 'app/quiz/rules/rules.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { StatsComponent } from 'app/quiz/answer/stats/stats.component';
import { TimesComponent } from 'app/quiz/answer/times/times.component';
import { SanitizerPipe } from 'app/quiz/answer/sanitizer-pipe';

@NgModule({
  imports: [
    AdventQuizSharedModule,
    RouterModule.forChild([
      {
        path: 'ranking',
        component: LeaderboardComponent,
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'IBL Advent Quiz Ranking'
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'IBL Advent Quiz Rules'
        },
        canActivate: [UserRouteAccessService]
      }
    ])
  ],
  providers: [AnswerModalService],
  declarations: [
    QuizComponent,
    AnswerComponent,
    LeaderboardComponent,
    LoginComponent,
    RulesComponent,
    StatsComponent,
    TimesComponent,
    SanitizerPipe
  ],
  exports: [QuizComponent, LoginComponent],
  entryComponents: [AnswerComponent]
})
export class QuizModule {}
