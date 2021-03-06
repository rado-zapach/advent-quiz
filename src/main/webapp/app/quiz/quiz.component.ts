import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Question } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question/question.service';
import { AnswerModalService } from 'app/quiz/answer/answer-modal.service';

@Component({
  selector: 'jhi-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['quiz.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: Question[];

  constructor(private questionService: QuestionService, private answerModalService: AnswerModalService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.query().subscribe((res: HttpResponse<Question[]>) => {
      this.questions = res.body.sort((a, b) => a.time.diff(b.time));
    });
  }

  answerQuestion(question: Question) {
    this.answerModalService.open(question);
  }

  ngOnDestroy() {}
}
