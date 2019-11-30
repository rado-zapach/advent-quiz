import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionStats } from 'app/shared/model/question-stats.model';

type EntityResponseType = HttpResponse<IQuestion>;
type EntityArrayResponseType = HttpResponse<IQuestion[]>;

@Injectable({ providedIn: 'root' })
export class QuestionService {
  public resourceUrl = SERVER_API_URL + 'api/questions';

  constructor(protected http: HttpClient) {}

  create(question: IQuestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(question);
    return this.http
      .post<IQuestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(question: IQuestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(question);
    return this.http
      .put<IQuestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuestion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStats(id: number): Observable<HttpResponse<QuestionStats[]>> {
    return this.http.get<QuestionStats[]>(`${this.resourceUrl}/${id}/stats`, { observe: 'response' });
  }

  protected convertDateFromClient(question: IQuestion): IQuestion {
    const copy: IQuestion = Object.assign({}, question, {
      time: question.time != null && question.time.isValid() ? question.time.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time != null ? moment(res.body.time) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((question: IQuestion) => {
        question.time = question.time != null ? moment(question.time) : null;
      });
    }
    return res;
  }
}
