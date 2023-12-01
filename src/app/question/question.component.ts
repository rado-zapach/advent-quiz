import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {generateClient} from 'aws-amplify/api';
import {debounceTime, filter, first, interval, map, switchMap, takeWhile, timer} from 'rxjs';
import * as queries from '../../graphql/queries';
import {GetQuestionState} from './get-question-state';
import {PlayerQuestionState} from './player-question-state.enum';
import {PlayerQuestionView} from './player-question-view';
import {QuestionClosedComponent} from './question-closed/question-closed.component';
import {QuestionOpenComponent} from './question-open/question-open.component';

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        QuestionClosedComponent,
        QuestionOpenComponent,
        MatProgressBarModule,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
    public readonly client = generateClient();
    public readonly question = signal<PlayerQuestionView | undefined>(undefined);
    public readonly timeRemaining$;
    public readonly State = PlayerQuestionState;

    public constructor(@Inject(MAT_DIALOG_DATA) public readonly questionId: string) {
        // update question at open/close time
        interval(1000)
            .pipe(
                filter(() => {
                    const q = this.question();
                    if (!q) {
                        return false;
                    }
                    const now = new Date().getTime();
                    const openTime = new Date(q.openTime).getTime();
                    const closeTime = new Date(q.closeTime).getTime();
                    return (
                        (q.state === PlayerQuestionState.BEFORE && now >= openTime) ||
                        (q.state === PlayerQuestionState.OPEN && now >= closeTime)
                    );
                }),
                debounceTime(1000),
                switchMap(() =>
                    this.client.graphql({
                        query: queries.playerQuestion,
                        variables: {
                            questionId: this.questionId,
                        },
                    })
                ),
                first(),
                takeUntilDestroyed()
            )
            .subscribe(result => {
                const q = result.data.playerQuestion;
                this.question.set({
                    ...q,
                    day: new Date(q.openTime).getDate(),
                    state: GetQuestionState(q),
                });
            });

        // update remaining time to open/close time
        this.timeRemaining$ = timer(0, 1000).pipe(
            filter(() => !!this.question()),
            map(() => {
                const q = this.question();
                if (!q) {
                    return 9999;
                }
                const now = new Date().getTime();
                const openTime = new Date(q.openTime).getTime();
                const closeTime = new Date(q.closeTime).getTime();
                const t = now < openTime ? openTime - now : closeTime - now;
                return t / 1000;
            }),
            takeWhile(s => s >= 0),
            map(sec => {
                let hours: number | string = Math.floor(sec / 3600);
                let minutes: number | string = Math.floor((sec - hours * 3600) / 60);
                let seconds: number | string = Math.floor(sec - hours * 3600 - minutes * 60);
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                return `${hours}h ${minutes}m ${seconds}s`;
            })
        );
    }

    public async ngOnInit() {
        const result = await this.client.graphql({
            query: queries.playerQuestion,
            variables: {
                questionId: this.questionId,
            },
        });
        const q = result.data.playerQuestion;
        this.question.set({
            ...q,
            day: new Date(q.openTime).getDate(),
            state: GetQuestionState(q),
        });
    }
}
