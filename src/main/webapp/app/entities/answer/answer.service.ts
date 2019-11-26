import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnswer } from 'app/shared/model/answer.model';
import { IQuestion } from 'app/shared/model/question.model';
import { Ranking } from 'app/shared/model/ranking.model';

type EntityResponseType = HttpResponse<IAnswer>;
type EntityArrayResponseType = HttpResponse<IAnswer[]>;

@Injectable({ providedIn: 'root' })
export class AnswerService {
  public resourceUrl = SERVER_API_URL + 'api/answers';
  public selectedQuestion: IQuestion;

  constructor(protected http: HttpClient) {}

  create(answer: IAnswer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(answer);
    return this.http
      .post<IAnswer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(answer: IAnswer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(answer);
    return this.http
      .put<IAnswer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnswer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  ranking(): Observable<HttpResponse<Ranking[]>> {
    return this.http.get<Ranking[]>(`${this.resourceUrl}/ranking`, { observe: 'response' });
  }

  protected convertDateFromClient(answer: IAnswer): IAnswer {
    const copy: IAnswer = Object.assign({}, answer, {
      time: answer.time != null && answer.time.isValid() ? answer.time.toJSON() : null
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
      res.body.forEach((answer: IAnswer) => {
        answer.time = answer.time != null ? moment(answer.time) : null;
      });
    }
    return res;
  }
}
