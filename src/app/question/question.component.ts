import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {generateClient} from 'aws-amplify/api';
import {filter, first, interval, map, switchMap, takeWhile, timer} from 'rxjs';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {PlayerQuestion} from '../API.service';
import {CompPlayerQuestion} from '../comp-player-question';
import {SanitizerPipe} from './sanitizer-pipe';

enum State {
    BEFORE = 'before',
    OPEN = 'open',
    CLOSED = 'closed',
}

interface Question extends CompPlayerQuestion {
    state: State;
}

function GetState(q: PlayerQuestion) {
    const now = new Date().getTime();
    const openTime = new Date(q.openTime).getTime();
    const closeTime = new Date(q.closeTime).getTime();
    return now >= closeTime ? State.CLOSED : now >= openTime ? State.OPEN : State.BEFORE;
}

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        SanitizerPipe,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
    public readonly client = generateClient();
    public readonly question;
    public readonly timeRemaining$;

    public constructor(@Inject(MAT_DIALOG_DATA) q: CompPlayerQuestion) {
        this.question = signal<Question>({
            ...q,
            state: GetState(q),
        });

        interval(1000)
            .pipe(
                filter(() => {
                    const q = this.question();
                    const now = new Date().getTime();
                    const openTime = new Date(q.openTime).getTime();
                    const closeTime = new Date(q.closeTime).getTime();
                    return (
                        (q.state === State.BEFORE && now >= openTime) ||
                        (q.state === State.OPEN && now >= closeTime)
                    );
                }),
                switchMap(() =>
                    this.client.graphql({
                        query: queries.playerQuestion,
                        variables: {
                            questionId: this.question().id,
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
                    state: GetState(q),
                });
            });

        this.timeRemaining$ = timer(0, 1000).pipe(
            map(n => {
                const q = this.question();
                const now = new Date().getTime();
                const openTime = new Date(q.openTime).getTime();
                const closeTime = new Date(q.closeTime).getTime();
                return Math.max(closeTime - now, openTime - now) / 1000;
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

    public async onSubmitAnswer(answer: string): Promise<void> {
        const result = await this.client.graphql({
            query: mutations.playerSaveAnswer,
            variables: {
                questionId: this.question().id,
                text: answer,
            },
        });
        console.log(result);
    }

    protected readonly State = State;
}
