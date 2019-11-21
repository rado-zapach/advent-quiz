import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { AnswerComponent } from './answer.component';
import { AnswerDetailComponent } from './answer-detail.component';
import { AnswerUpdateComponent } from './answer-update.component';
import { AnswerDeleteDialogComponent } from './answer-delete-dialog.component';
import { answerRoute } from './answer.route';

@NgModule({
  imports: [AdventQuizSharedModule, RouterModule.forChild(answerRoute)],
  declarations: [AnswerComponent, AnswerDetailComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent],
  entryComponents: [AnswerDeleteDialogComponent]
})
export class AdventQuizAnswerModule {}
