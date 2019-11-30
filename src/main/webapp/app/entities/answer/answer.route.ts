import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer } from 'app/shared/model/answer.model';
import { AnswerService } from './answer.service';
import { AnswerComponent } from './answer.component';
import { AnswerDetailComponent } from './answer-detail.component';
import { AnswerUpdateComponent } from './answer-update.component';
import { IAnswer } from 'app/shared/model/answer.model';

@Injectable({ providedIn: 'root' })
export class AnswerResolve implements Resolve<IAnswer> {
  constructor(private service: AnswerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnswer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((answer: HttpResponse<Answer>) => answer.body));
    }
    return of(new Answer());
  }
}

export const answerRoute: Routes = [
  {
    path: '',
    component: AnswerComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Answers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnswerDetailComponent,
    resolve: {
      answer: AnswerResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Answers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnswerUpdateComponent,
    resolve: {
      answer: AnswerResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Answers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnswerUpdateComponent,
    resolve: {
      answer: AnswerResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Answers'
    },
    canActivate: [UserRouteAccessService]
  }
];
