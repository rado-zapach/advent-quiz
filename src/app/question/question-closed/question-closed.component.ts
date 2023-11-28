import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import {PlayerAnswer} from '../../API.service';
import {PlayerAttributesService} from '../../common/player-attributes.service';
import {PlayerEmailPipe} from '../../common/player-email.pipe';
import {SanitizerPipe} from '../../common/sanitizer.pipe';
import {UserService} from '../../common/user.service';
import {WheelComponent} from '../../wheel/wheel.component';
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
        MatTabsModule,
        WheelComponent,
        MatButtonModule,
    ],
    templateUrl: './question-closed.component.html',
    styleUrl: './question-closed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionClosedComponent implements OnInit {
    public readonly client = generateClient();
    public readonly userService = inject(UserService);
    public playerAttributesService = inject(PlayerAttributesService);
    public readonly isLoading = signal(true);

    @Input({required: true})
    public question: PlayerQuestionView | undefined;

    public readonly answer = signal<PlayerAnswer | undefined>(undefined);
    public readonly answerList = signal<PlayerAnswer[] | undefined>(undefined);
    public readonly lotteryOptions = computed(() => {
        const answers = this.answerList();
        if (!answers) {
            return undefined;
        }
        return answers.map(a => {
            const email = this.playerAttributesService.getEmail(a.player);
            return email.substring(0, email.indexOf('@'));
        });
    });

    public winner = signal<string | undefined>(undefined);

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

    public async onWinner(winner: string): Promise<void> {
        if (!this.question) {
            throw new Error();
        }
        if (winner.length < 1) {
            return;
        }
        this.winner.set(winner);

        const attr = this.playerAttributesService.attributes.find(attr => attr.email.startsWith(winner));
        if (!attr) {
            throw new Error();
        }
        this.client.graphql({
            query: queries.adminCanWinQuestion,
            variables: {
                questionId: this.question.id,
                username: attr.username,
            },
        });
    }

    public async onSaveWinner(): Promise<void> {
        const winner = this.winner();
        if (!this.question || !winner || winner.length < 1) {
            throw new Error();
        }
        const attr = this.playerAttributesService.attributes.find(attr => attr.email.startsWith(winner));
        if (!attr) {
            throw new Error();
        }
        this.client.graphql({
            query: mutations.adminSaveWinner,
            variables: {
                questionId: this.question.id,
                username: attr.username,
            },
        });
    }
}
