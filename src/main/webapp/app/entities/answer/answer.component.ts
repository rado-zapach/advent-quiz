import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from './answer.service';
import { AnswerDeleteDialogComponent } from './answer-delete-dialog.component';
import * as moment from 'moment';
import { QuestionService } from 'app/entities/question/question.service';
import { IQuestion } from 'app/shared/model/question.model';

@Component({
  selector: 'jhi-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit, OnDestroy {
  answers: IAnswer[];
  questions: IQuestion[];
  selectedQuestion: IQuestion;
  eventSubscriber: Subscription;

  constructor(
    protected answerService: AnswerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected questionService: QuestionService
  ) {}

  loadAllAnswers(question: IQuestion) {
    this.selectedQuestion = question;
    this.answerService.query({ 'questionId.equals': question.id }).subscribe((res: HttpResponse<IAnswer[]>) => {
      const sortedAnswers = res.body.filter(a => a.time).sort((a, b) => moment(b.time).diff(moment(a.time)));

      // TODO:(
      const latestAnswersFromUsers: IAnswer[] = [];
      sortedAnswers.forEach(answer => {
        if (!latestAnswersFromUsers.map(a => a.user.id).includes(answer.user.id)) {
          latestAnswersFromUsers.push(answer);
        }
      });
      this.answers = latestAnswersFromUsers;
    });
  }

  loadAllQuestions() {
    this.questionService.query().subscribe((res: HttpResponse<IQuestion[]>) => {
      this.questions = res.body.filter(a => a.time).sort((a, b) => moment(a.time).diff(moment(b.time)));
    });
  }

  ngOnInit() {
    this.loadAllQuestions();
    this.registerChangeInAnswers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAnswer) {
    return item.id;
  }

  registerChangeInAnswers() {
    this.eventSubscriber = this.eventManager.subscribe('answerListModification', () => this.loadAllAnswers(this.selectedQuestion));
  }

  delete(answer: IAnswer) {
    const modalRef = this.modalService.open(AnswerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.answer = answer;
  }
}