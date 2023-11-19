import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import {CompPlayerQuestion} from '../comp-player-question';
import {SanitizerPipe} from './sanitizer-pipe';

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

    public constructor(@Inject(MAT_DIALOG_DATA) public q: CompPlayerQuestion) {
        console.log(q);
    }

    public async onSubmitAnswer(answer: string): Promise<void> {
        const result = await this.client.graphql({
            query: mutations.createAnswer,
            variables: {
                input: {
                    owner: 'test',
                    text: answer,
                    questionAnswersId: this.q.id,
                },
            },
        });
        console.log(result.data.createAnswer);
    }
}
