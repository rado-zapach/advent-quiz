import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'app/shared/model/ranking.model';
import { map } from 'rxjs/operators';
import { AnswerService } from 'app/entities/answer/answer.service';

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['leaderboard.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  rankings$: Observable<Ranking[]>;

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.rankings$ = this.answerService.ranking().pipe(map(r => r.body.sort((a, b) => b.points - a.points)));
  }

  ngOnDestroy() {}
}
