import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {generateClient} from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import {PlayerQuestion} from '../API.service';
import {CompPlayerQuestion} from '../comp-player-question';
import {QuestionComponent} from '../question/question.component';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        NgOptimizedImage,
        MatTooltipModule,
        MatDialogModule,
        MatProgressBarModule,
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
    public dialog = inject(MatDialog);
    public readonly client = generateClient();
    public questions = signal<CompPlayerQuestion[]>([]);

    public async ngOnInit(): Promise<void> {
        const response = await this.client.graphql({
            query: queries.playerQuestionList,
        });
        const questions = response.data.playerQuestionList.map(q => ({
            ...q,
            day: new Date(q.openTime).getDate(),
        }));
        questions.sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime());
        this.questions.set(questions);
    }

    public openQuestion(q: PlayerQuestion): void {
        this.dialog.open(QuestionComponent, {data: q});
    }
}
