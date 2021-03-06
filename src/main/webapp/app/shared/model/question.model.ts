import { Moment } from 'moment';
import { IAnswer } from 'app/shared/model/answer.model';

export interface IQuestion {
  id?: number;
  text?: string;
  choices?: string;
  icon?: string;
  answer?: string;
  time?: Moment;
  showAnswer?: boolean;
  answers?: IAnswer[];
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public text?: string,
    public choices?: string,
    public icon?: string,
    public answer?: string,
    public time?: Moment,
    public showAnswer?: boolean,
    public answers?: IAnswer[]
  ) {
    this.showAnswer = this.showAnswer || false;
  }
}
