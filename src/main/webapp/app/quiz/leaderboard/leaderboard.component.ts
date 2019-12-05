import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'app/shared/model/ranking.model';
import { map } from 'rxjs/operators';
import { AnswerService } from 'app/entities/answer/answer.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['leaderboard.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  rankings$: Observable<Ranking[]>;

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.rankings$ = this.answerService.ranking().pipe(
      map(r =>
        r.body.sort((a, b) => {
          if (a.points !== b.points) {
            return b.points - a.points;
          }
          if (a.averageScoredAnswerTimeMs !== b.averageScoredAnswerTimeMs) {
            if (a.averageScoredAnswerTimeMs === 0) {
              return 1;
            }
            if (b.averageScoredAnswerTimeMs === 0) {
              return -1;
            }
            return a.averageScoredAnswerTimeMs - b.averageScoredAnswerTimeMs;
          }
          return a.login.localeCompare(b.login);
        })
      )
    );
  }

  formatAverageTime(timeMs: number): string {
    return timeMs === 0 ? 'N/A' : moment.utc(timeMs).format('HH:mm:ss.SSS');
  }

  ngOnDestroy() {}
}
