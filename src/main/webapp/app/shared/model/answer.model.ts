import { Moment } from 'moment';
import { IQuestion } from 'app/shared/model/question.model';
import { IUser } from 'app/core/user/user.model';

export interface IAnswer {
  id?: number;
  text?: string;
  time?: Moment;
  isCorrect?: boolean;
  points?: number;
  question?: IQuestion;
  user?: IUser;
}

export class Answer implements IAnswer {
  constructor(
    public id?: number,
    public text?: string,
    public time?: Moment,
    public isCorrect?: boolean,
    public points?: number,
    public question?: IQuestion,
    public user?: IUser
  ) {
    this.isCorrect = this.isCorrect || false;
  }
}
