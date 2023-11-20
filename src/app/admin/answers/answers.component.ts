import {CommonModule} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
    ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActivatedRoute} from '@angular/router';
import {generateClient} from 'aws-amplify/api';
import {of, switchMap} from 'rxjs';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import {Answer, Question, UpdateAnswerInput} from '../../API.service';
import {PlayerEmailPipe} from '../../player-email.pipe';
import {SanitizerPipe} from '../../question/sanitizer.pipe';

interface QuestionWithDay extends Question {
    day: number;
}

@Component({
    selector: 'app-answers',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSortModule,
        MatTableModule,
        FormsModule,
        MatTooltipModule,
        SanitizerPipe,
        PlayerEmailPipe,
    ],
    templateUrl: './answers.component.html',
    styleUrl: './answers.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersComponent implements AfterViewInit {
    private readonly route = inject(ActivatedRoute);
    public readonly client = generateClient();
    public readonly displayedColumns = ['player', 'text', 'isCorrect', 'points', 'updatedAt', 'actions'];
    public dataSource = new MatTableDataSource<Answer>([]);
    public editAnswer: UpdateAnswerInput | undefined;
    public question = signal<QuestionWithDay | undefined>(undefined);

    public constructor() {
        this.route.paramMap
            .pipe(
                takeUntilDestroyed(),
                switchMap(params => {
                    const id = params.get('id');
                    if (!id) {
                        return of(undefined);
                    }
                    return this.client.graphql({
                        query: queries.getQuestion,
                        variables: {
                            id: id,
                        },
                    });
                })
            )
            .subscribe(response => {
                if (response?.data?.getQuestion) {
                    this.question.set({
                        ...response.data.getQuestion,
                        day: new Date(response.data.getQuestion.openTime).getDate(),
                    });
                }
            });

        this.route.paramMap
            .pipe(
                takeUntilDestroyed(),
                switchMap(params => {
                    const id = params.get('id');
                    if (!id) {
                        return of(undefined);
                    }
                    return this.client.graphql({
                        query: queries.listAnswers,
                        variables: {
                            filter: {
                                questionId: {
                                    eq: id,
                                },
                            },
                        },
                    });
                })
            )
            .subscribe(response => {
                if (response) {
                    this.dataSource.data = response.data.listAnswers.items;
                }
            });

        this.client
            .graphql({
                query: subscriptions.onCreateAnswer,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const a = event.data.onCreateAnswer;
                this.dataSource.data = [a, ...this.dataSource.data];
            });

        this.client
            .graphql({
                query: subscriptions.onUpdateAnswer,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const a = event.data.onUpdateAnswer;
                this.dataSource.data = [a, ...this.dataSource.data.filter(i => i.id !== a.id)];
            });

        this.client
            .graphql({
                query: subscriptions.onDeleteAnswer,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const a = event.data.onDeleteAnswer;
                this.dataSource.data = this.dataSource.data.filter(i => i.id !== a.id);
            });
    }

    @ViewChild(MatSort) sort: MatSort | undefined;
    public ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    // public async onCreate() {
    //     await this.client.graphql({
    //         query: mutations.createAnswer,
    //         variables: {
    //             input: {
    //                 text: '----',
    //                 choices: '',
    //                 icon: '',
    //                 correctAnswer: '',
    //                 openTime: new Date(`2023-12-01T09:30:00`).toISOString(),
    //                 closeTime: new Date(`2023-12-01T22:00:00`).toISOString(),
    //             },
    //         },
    //     });
    // }

    public async onUpdate() {
        if (!this.editAnswer) {
            return;
        }
        await this.client.graphql({
            query: mutations.updateAnswer,
            variables: {
                input: this.editAnswer,
            },
        });
        this.editAnswer = undefined;
    }

    public async onDelete(id: string) {
        await this.client.graphql({
            query: mutations.deleteAnswer,
            variables: {
                input: {
                    id,
                },
            },
        });
    }

    public onStartEdit(a: Answer | undefined): void {
        if (!a) {
            this.editAnswer = undefined;
            return;
        }
        this.editAnswer = {
            id: a.id,
            points: a.points,
            isCorrect: a.isCorrect,
        };
    }
}
