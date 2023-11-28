import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnInit, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import {SanitizerPipe} from '../../common/sanitizer.pipe';
import {PlayerQuestionView} from '../player-question-view';

@Component({
    selector: 'app-question-open',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatRadioModule,
        ReactiveFormsModule,
        SanitizerPipe,
        TextFieldModule,
        FormsModule,
    ],
    templateUrl: './question-open.component.html',
    styleUrl: './question-open.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionOpenComponent implements OnInit {
    public readonly client = generateClient();
    public readonly isLoading = signal(true);

    @Input({required: true})
    public question: PlayerQuestionView | undefined;
    @Input({required: false})
    public timeRemaining: string | undefined | null;

    public answerText: string | undefined;

    public async ngOnInit() {
        if (!this.question) {
            throw new Error('No question!');
        }

        const result = await this.client.graphql({
            query: queries.playerAnswer,
            variables: {
                questionId: this.question.id,
            },
        });
        const answer = result.data.playerAnswer;
        if (answer) {
            this.answerText = answer.text ?? '';
        }
        this.isLoading.set(false);
    }

    public async onSubmitAnswer(): Promise<void> {
        if (!this.question) {
            throw new Error('No question!');
        }

        this.isLoading.set(true);
        await this.client.graphql({
            query: mutations.playerSaveAnswer,
            variables: {
                questionId: this.question.id,
                text: this.answerText ?? '',
            },
        });
        this.isLoading.set(false);
    }
}
