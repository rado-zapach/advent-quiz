import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer } from '@angular/core';
import { Question } from 'app/shared/model/question.model';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';
import { AnswerService } from 'app/entities/answer/answer.service';
import { Answer } from 'app/shared/model/answer.model';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HttpResponse } from '@angular/common/http';
import { QuestionService } from 'app/entities/question/question.service';
import { AccountService } from 'app/core/auth/account.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import animatedTheme from '@amcharts/amcharts4/themes/animated';
import materialTheme from '@amcharts/amcharts4/themes/material';

am4core.useTheme(animatedTheme);
am4core.useTheme(materialTheme);

@Component({
  selector: 'jhi-quiz-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['answer.scss']
})
export class AnswerComponent implements OnInit, OnDestroy {
  @Input()
  question: Question;
  isFreeText: boolean;
  choices: string[];
  saveCounter = 0;
  saveDate: Moment;
  isAnswerEmpty: boolean;
  isCorrectAnswer: boolean;
  destroy$: Subject<void> = new Subject<void>();

  private chart: am4charts.PieChart3D;

  answerForm = this.fb.group({
    answer: ['']
  });

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jhiAlertService: JhiAlertService,
    private answerService: AnswerService,
    private questionService: QuestionService,
    private accountService: AccountService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.answerForm.valueChanges
      .pipe(
        startWith(this.answerForm),
        takeUntil(this.destroy$)
      )
      .subscribe(v => (this.isAnswerEmpty = !v.answer || v.answer.length === 0));

    this.questionInit(this.question);
    this.fetchQuestion()
      .pipe(switchMap(q => this.fetchAnswer().pipe(map(a => [q, a] as [Question, Answer]))))
      .subscribe(([q, a]) => {
        this.questionInit(q);
        if (a) {
          this.answerForm.setValue({ answer: a.text });
          this.saveDate = moment(a.time);
          this.isCorrectAnswer = a.isCorrect;
        }
        this.graphInit();
      });
  }

  graphInit(): void {
    if (this.question.showAnswer) {
      this.questionService.getStats(this.question.id).subscribe(stats => {
        this.zone.runOutsideAngular(() => {
          const chart = am4core.create('chartdiv', am4charts.PieChart3D);
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
          chart.data = stats.body;
          chart.responsive.enabled = true;
          chart.pixelPerfect = true;

          const series = chart.series.push(new am4charts.PieSeries3D());
          series.dataFields.value = 'second';
          series.dataFields.category = 'first';
          series.tooltip.label.wrap = true;
          series.ticks.template.disabled = true;
          series.alignLabels = false;
          series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
          series.labels.template.radius = am4core.percent(-40);
          series.labels.template.fill = am4core.color('white');
          series.labels.template.adapter.add('radius', function(radius, target) {
            if (target.dataItem && target.dataItem.values.value.percent < 10) {
              return 0;
            }
            return radius;
          });
          series.labels.template.adapter.add('fill', function(color, target) {
            if (target.dataItem && target.dataItem.values.value.percent < 10) {
              return am4core.color('#000');
            }
            return color;
          });

          this.chart = chart;
        });
      });
    }
  }

  onSubmit() {
    const answer = {
      ...new Answer(),
      text: this.answerForm.get(['answer']).value,
      question: this.question
    };
    this.answerService.create(answer).subscribe((response: HttpResponse<Answer>) => {
      this.saveCounter++;
      this.saveDate = moment(response.body.time);
    });
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  fetchAnswer(): Observable<Answer> {
    return this.accountService.identity().pipe(
      switchMap(identity => {
        const req = this.accountService.hasAnyAuthority('ROLE_ADMIN')
          ? { 'questionId.equals': this.question.id, 'userId.equals': identity.id }
          : { 'questionId.equals': this.question.id };
        return this.answerService.query(req).pipe(
          map((response: HttpResponse<Answer[]>) => {
            if (response.body && response.body.length > 0) {
              return response.body.sort((a, b) => moment(b.time).diff(moment(a.time)))[0];
            } else {
              return undefined;
            }
          })
        );
      })
    );
  }

  fetchQuestion(): Observable<Question> {
    return this.questionService.find(this.question.id).pipe(map((response: HttpResponse<Question>) => response.body));
  }

  onRefreshClick() {
    this.fetchQuestion().subscribe(q => this.questionInit(q));
  }

  questionInit(q: Question) {
    this.question = q;
    this.answerForm.reset({ answer: { value: '', disabled: this.question.showAnswer } });
    this.isFreeText = !this.question.choices || this.question.choices.length === 0;
    if (!this.isFreeText) {
      this.choices = this.question.choices.split(';').map(i => i.trim());
    } else if (!q.showAnswer && q.text && q.text.length > 0) {
      setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#answer'), 'focus', []), 0);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
