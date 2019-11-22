import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer } from '@angular/core';
import { Question } from 'app/shared/model/question.model';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';
import { AnswerService } from 'app/entities/answer/answer.service';
import { Answer } from 'app/shared/model/answer.model';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['answer.scss']
})
export class AnswerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  question: Question;
  isFreeText: boolean;
  choices: string[];
  saveCounter = 0;
  isAnswerEmpty: boolean;
  // TODO: fetch the selected answer
  destroy$: Subject<void> = new Subject<void>();

  answerForm = this.fb.group({
    answer: ['']
  });

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jhiAlertService: JhiAlertService,
    private answerService: AnswerService
  ) {}

  ngOnInit() {
    this.isFreeText = !this.question.choices || this.question.choices.length === 0;
    if (!this.isFreeText) {
      this.choices = this.question.choices.split(';');
    }
    this.answerForm.valueChanges
      .pipe(
        startWith(this.answerForm),
        takeUntil(this.destroy$)
      )
      .subscribe(v => (this.isAnswerEmpty = !v.answer || v.answer.length === 0));
  }

  ngAfterViewInit() {
    if (this.isFreeText) {
      setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#answer'), 'focus', []), 0);
    }
  }

  onSubmit() {
    const answer = {
      ...new Answer(),
      text: this.answerForm.get(['answer']).value,
      question: this.question
    };
    this.answerService.create(answer).subscribe(() => this.saveCounter++);
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
