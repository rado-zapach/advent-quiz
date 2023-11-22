import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {generateClient} from 'aws-amplify/api';
import {filter, first, interval, map, switchMap, takeWhile, timer} from 'rxjs';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {PlayerAnswer, PlayerQuestion} from '../API.service';
import {SanitizerPipe} from '../common/sanitizer.pipe';

enum State {
    BEFORE = 'before',
    OPEN = 'open',
    CLOSED = 'closed',
}

interface Question extends PlayerQuestion {
    day: number;
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
        MatProgressBarModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
    public readonly client = generateClient();
    public readonly question;
    public readonly timeRemaining$;
    public readonly State = State;
    public readonly answer = signal<PlayerAnswer | undefined>(undefined);
    public answerText: string | undefined;
    public isAnswerSavingOrLoading: boolean = true;

    public constructor(@Inject(MAT_DIALOG_DATA) q: Question) {
        this.question = signal<Question>({
            ...q,
            state: GetState(q),
        });

        // update question at open/close time
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

        // update remaining time to open/close time
        this.timeRemaining$ = timer(0, 1000).pipe(
            map(n => {
                const q = this.question();
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
        if (this.question().state === State.BEFORE) {
            return;
        }
        const result = await this.client.graphql({
            query: queries.playerAnswer,
            variables: {
                questionId: this.question().id,
            },
        });
        const answer = result.data.playerAnswer;
        if (answer) {
            this.answer.set(answer);
            this.answerText = answer.text;
        }
        this.isAnswerSavingOrLoading = false;
    }

    public async onSubmitAnswer(answer: string): Promise<void> {
        this.isAnswerSavingOrLoading = true;
        await this.client.graphql({
            query: mutations.playerSaveAnswer,
            variables: {
                questionId: this.question().id,
                text: answer,
            },
        });
        this.isAnswerSavingOrLoading = false;
    }
}
