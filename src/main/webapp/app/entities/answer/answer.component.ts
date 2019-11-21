import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from './answer.service';
import { AnswerDeleteDialogComponent } from './answer-delete-dialog.component';

@Component({
  selector: 'jhi-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit, OnDestroy {
  answers: IAnswer[];
  eventSubscriber: Subscription;

  constructor(protected answerService: AnswerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.answerService.query().subscribe((res: HttpResponse<IAnswer[]>) => {
      this.answers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAnswers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAnswer) {
    return item.id;
  }

  registerChangeInAnswers() {
    this.eventSubscriber = this.eventManager.subscribe('answerListModification', () => this.loadAll());
  }

  delete(answer: IAnswer) {
    const modalRef = this.modalService.open(AnswerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.answer = answer;
  }
}
