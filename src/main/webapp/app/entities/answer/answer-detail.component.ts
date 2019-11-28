import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnswer } from 'app/shared/model/answer.model';

@Component({
  selector: 'jhi-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['answer.scss']
})
export class AnswerDetailComponent implements OnInit {
  answer: IAnswer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ answer }) => {
      this.answer = answer;
    });
  }

  previousState() {
    window.history.back();
  }
}
