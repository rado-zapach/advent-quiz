import {CommonModule} from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
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
import {RouterLink} from '@angular/router';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import {Question, UpdateQuestionInput} from '../../API.service';

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatMenuModule,
        MatSortModule,
    ],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit, AfterViewInit {
    public readonly client = generateClient();
    public readonly displayedColumns = [
        'text',
        'choices',
        'icon',
        'correctAnswer',
        'openTime',
        'closeTime',
        'actions',
    ];
    public dataSource = new MatTableDataSource<Question>([]);
    public editQuestion: UpdateQuestionInput | undefined;

    public constructor() {
        this.client
            .graphql({
                query: subscriptions.onCreateQuestion,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const q = event.data.onCreateQuestion;
                this.dataSource.data = [q, ...this.dataSource.data];
            });

        this.client
            .graphql({
                query: subscriptions.onUpdateQuestion,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const q = event.data.onUpdateQuestion;
                this.dataSource.data = [q, ...this.dataSource.data.filter(i => i.id !== q.id)];
            });

        this.client
            .graphql({
                query: subscriptions.onDeleteQuestion,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const q = event.data.onDeleteQuestion;
                this.dataSource.data = this.dataSource.data.filter(i => i.id !== q.id);
            });
    }

    @ViewChild(MatSort) sort: MatSort | undefined;

    public ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    public async ngOnInit() {
        const response = await this.client.graphql({
            query: queries.listQuestions,
        });
        this.dataSource.data = response.data.listQuestions.items;
    }

    public async onCreate() {
        await this.client.graphql({
            query: mutations.createQuestion,
            variables: {
                input: {
                    text: '----',
                    choices: '',
                    icon: '',
                    correctAnswer: '',
                    openTime: new Date(`2023-12-01T09:30:00`).toISOString(),
                    closeTime: new Date(`2023-12-01T22:00:00`).toISOString(),
                },
            },
        });
    }

    public async onUpdate() {
        if (!this.editQuestion) {
            return;
        }
        await this.client.graphql({
            query: mutations.updateQuestion,
            variables: {
                input: this.editQuestion,
            },
        });
        this.editQuestion = undefined;
    }

    public async onDelete(id: string) {
        await this.client.graphql({
            query: mutations.deleteQuestion,
            variables: {
                input: {
                    id,
                },
            },
        });
    }

    public onStartEdit(q: Question | undefined): void {
        if (!q) {
            this.editQuestion = undefined;
            return;
        }
        this.editQuestion = {
            id: q.id,
            text: q.text,
            choices: q.choices,
            icon: q.icon,
            closeTime: q.closeTime,
            correctAnswer: q.correctAnswer,
            openTime: q.openTime,
        };
    }
}
