import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AnswerComponent } from 'app/quiz/answer/answer.component';
import { Question } from 'app/shared/model/question.model';

@Injectable()
export class AnswerModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(question: Question): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(AnswerComponent);
    modalRef.componentInstance.question = question;
    modalRef.result.finally(() => (this.isOpen = false));
    return modalRef;
  }
}
