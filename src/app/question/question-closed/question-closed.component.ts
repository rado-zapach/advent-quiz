import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnInit, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {generateClient} from 'aws-amplify/api';
import * as queries from '../../../graphql/queries';
import {PlayerAnswer} from '../../API.service';
import {PlayerEmailPipe} from '../../common/player-email.pipe';
import {SanitizerPipe} from '../../common/sanitizer.pipe';
import {PlayerQuestionView} from '../player-question-view';

@Component({
    selector: 'app-question-closed',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatRadioModule,
        PlayerEmailPipe,
        SanitizerPipe,
        TextFieldModule,
    ],
    templateUrl: './question-closed.component.html',
    styleUrl: './question-closed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionClosedComponent implements OnInit {
    public readonly client = generateClient();
    public readonly isLoading = signal(true);

    @Input({required: true})
    public question: PlayerQuestionView | undefined;

    public readonly answer = signal<PlayerAnswer | undefined>(undefined);
    public readonly answerList = signal<PlayerAnswer[] | undefined>(undefined);

    public async ngOnInit() {
        if (!this.question) {
            throw new Error('No question!');
        }

        const result = await Promise.all([
            this.client.graphql({
                query: queries.playerAnswer,
                variables: {
                    questionId: this.question.id,
                },
            }),
            this.client.graphql({
                query: queries.playerAnswerList,
                variables: {
                    questionId: this.question.id,
                },
            }),
        ]);
        const answer = result[0].data.playerAnswer;
        if (answer) {
            this.answer.set(answer);
        }
        const answerList = result[1].data.playerAnswerList;
        this.answerList.set(answerList);

        this.isLoading.set(false);
    }
}
