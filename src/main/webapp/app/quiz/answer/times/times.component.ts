import { AfterViewInit, Component, Input } from '@angular/core';
import { Answer } from 'app/shared/model/answer.model';
import { AnswerService } from 'app/entities/answer/answer.service';

@Component({
  selector: 'jhi-times',
  templateUrl: './times.component.html',
  styleUrls: ['times.scss']
})
export class TimesComponent implements AfterViewInit {
  @Input()
  public questionId;

  answerTimes = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private answerService: AnswerService) {}

  ngAfterViewInit() {
    this.answerService.answerTimes(this.questionId).subscribe(r => {
      this.answerTimes = r.body.sort((a, b) => a.time.diff(b.time));
      this.collectionSize = this.answerTimes.length;
    });
  }

  get answerTimesPaged(): Answer[] {
    return this.answerTimes
      .map((at, i) => {
        at.id = i + 1;
        return at;
      })
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
