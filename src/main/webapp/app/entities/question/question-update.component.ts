import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    text: [],
    choices: [],
    icon: [],
    answer: [],
    time: [null, [Validators.required]]
  });

  constructor(protected questionService: QuestionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);
    });
  }

  updateForm(question: IQuestion) {
    this.editForm.patchValue({
      id: question.id,
      text: question.text,
      choices: question.choices,
      icon: question.icon,
      answer: question.answer,
      time: question.time != null ? question.time.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  private createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id']).value,
      text: this.editForm.get(['text']).value,
      choices: this.editForm.get(['choices']).value,
      icon: this.editForm.get(['icon']).value,
      answer: this.editForm.get(['answer']).value,
      time: this.editForm.get(['time']).value != null ? moment(this.editForm.get(['time']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
