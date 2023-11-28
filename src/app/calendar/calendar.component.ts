import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {generateClient} from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import {PlayerQuestion} from '../API.service';
import {QuestionComponent} from '../question/question.component';

export interface Question extends PlayerQuestion {
    day: number;
    position: number;
    isOpen: boolean;
}

const questionPositions = [
    24, 1, 10, 17, 23, 8, 9, 21, 14, 3, 6, 19, 12, 18, 11, 15, 2, 22, 5, 16, 4, 13, 7, 20,
];

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
    styleUrls: ['./calendar.component.scss', './xmas-tree.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
    public dialog = inject(MatDialog);
    public readonly client = generateClient();
    public questions = signal<Question[]>([]);

    public async ngOnInit(): Promise<void> {
        const response = await this.client.graphql({
            query: queries.playerQuestionList,
        });
        const questions = response.data.playerQuestionList.map(q => {
            const day = new Date(q.openTime).getDate();
            const position = questionPositions.indexOf(day) + 1;
            return {
                ...q,
                day,
                position,
                isOpen: new Date().getTime() >= new Date(q.openTime).getTime(),
            };
        });
        questions.sort((a, b) => new Date(a.openTime).getTime() - new Date(b.openTime).getTime());
        this.questions.set(questions);
    }

    public openQuestion(q: PlayerQuestion): void {
        this.dialog.open(QuestionComponent, {data: q.id, width: '700px'});
    }
}
