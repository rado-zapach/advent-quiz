import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from "@angular/material/menu";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';
import {generateClient} from 'aws-amplify/api';
import {deleteQuestion} from "../../../graphql/mutations";
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import {Question} from '../../API.service';

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
    ],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
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
    isEditMode: boolean = false;

    public constructor() {
        this.client
            .graphql({
                query: subscriptions.onCreateQuestion,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const q = event.data.onCreateQuestion;
                // @ts-ignore
                this.dataSource.data = [q, ...this.dataSource.data];
            });

        this.client
            .graphql({
                query: subscriptions.onUpdateQuestion,
            })
            .pipe(takeUntilDestroyed())
            .subscribe(event => {
                const q = event.data.onUpdateQuestion;
                // @ts-ignore
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

    public async ngOnInit() {
        try {
            const response = await this.client.graphql({
                query: queries.listQuestions,
            });
            this.dataSource.data = response.data.listQuestions.items;
        } catch (e) {
            console.log('error fetching todos', e);
        }
    }

    public async onCreate() {
        try {
            const response = await this.client.graphql({
                query: mutations.createQuestion,
                variables: {
                    input: {
                        text: '----',
                        choices: '',
                        icon: '',
                        correctAnswer: '',
                        openTime: new Date().toISOString(),
                        closeTime: new Date().toISOString(),
                    },
                },
            });
            console.log('item created!', response);
        } catch (e) {
            console.log('error creating todo...', e);
        }
    }

    public async onDelete(id: string) {
        try {
            const response = await this.client.graphql({
                query: mutations.deleteQuestion,
                variables: {
                    input: {
                        id,
                    },
                },
            });
            console.log('item deleted!', response);
        } catch (e) {
            console.log('error deleting todo...', e);
        }
    }

    onToggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
    }

  protected readonly deleteQuestion = deleteQuestion;
}
