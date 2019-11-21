import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventQuizSharedModule } from 'app/shared/shared.module';
import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionUpdateComponent } from './question-update.component';
import { QuestionDeleteDialogComponent } from './question-delete-dialog.component';
import { questionRoute } from './question.route';

@NgModule({
  imports: [AdventQuizSharedModule, RouterModule.forChild(questionRoute)],
  declarations: [QuestionComponent, QuestionDetailComponent, QuestionUpdateComponent, QuestionDeleteDialogComponent],
  entryComponents: [QuestionDeleteDialogComponent]
})
export class AdventQuizQuestionModule {}
