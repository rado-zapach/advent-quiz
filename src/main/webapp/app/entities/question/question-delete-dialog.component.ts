import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';

@Component({
  templateUrl: './question-delete-dialog.component.html'
})
export class QuestionDeleteDialogComponent {
  question: IQuestion;

  constructor(protected questionService: QuestionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.questionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'questionListModification',
        content: 'Deleted an question'
      });
      this.activeModal.dismiss(true);
    });
  }
}
