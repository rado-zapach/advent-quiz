import { NgModule } from '@angular/core';
import { QuizComponent } from 'app/quiz/quiz.component';
import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { AnswerModalService } from 'app/quiz/answer/answer-modal.service';
import { AnswerComponent } from 'app/quiz/answer/answer.component';

@NgModule({
  imports: [AdventQuizSharedModule],
  providers: [AnswerModalService],
  declarations: [QuizComponent, AnswerComponent],
  exports: [QuizComponent],
  entryComponents: [AnswerComponent]
})
export class QuizModule {}
