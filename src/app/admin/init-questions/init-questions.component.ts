import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../../graphql/mutations';

@Component({
    selector: 'app-init-questions',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
    ],
    templateUrl: './init-questions.component.html',
    styleUrl: './init-questions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitQuestionsComponent {
    private readonly client = generateClient();

    public startDate = '2023-12-01T09:00:00.000Z';
    public closeOffsetHours = 12;
    public questionsCount = 24;

    private readonly icons = [
        '/assets/icons/001-christmas tree.png',
        '/assets/icons/002-christmas wreath.png',
        '/assets/icons/003-santa claus.png',
        '/assets/icons/004-candle.png',
        '/assets/icons/006-bow tie.png',
        '/assets/icons/007-bauble.png',
        '/assets/icons/012-star.png',
        '/assets/icons/015-lights.png',
        '/assets/icons/016-snowflake.png',
        '/assets/icons/018-angel.png',
        '/assets/icons/020-present.png',
        '/assets/icons/021-gingerbread man.png',
        '/assets/icons/022-cookie.png',
        '/assets/icons/023-snow globe.png',
        '/assets/icons/030-bag.png',
        '/assets/icons/031-christmas tree.png',
        '/assets/icons/032-candy cane.png',
        '/assets/icons/038-hot drink.png',
        '/assets/icons/042-deer.png',
        '/assets/icons/044-sweater.png',
        '/assets/icons/045-gift.png',
        '/assets/icons/047-christmas sock.png',
        '/assets/icons/048-fireplace.png',
        '/assets/icons/050-mistletoe.png',
    ];

    public async onCreate() {
        const requests = Array.from({length: this.questionsCount}, (_, index) => index).map(i => {
            const openTime = new Date(this.startDate).getTime() + i * 24 * 60 * 60 * 1000;
            const closeTime = openTime + this.closeOffsetHours * 60 * 60 * 1000;
            return this.client.graphql({
                query: mutations.createQuestion,
                variables: {
                    input: {
                        text: 'question text',
                        choices: '',
                        icon: i < this.icons.length ? this.icons[i] : '',
                        correctAnswer: 'question answer',
                        openTime: new Date(openTime).toISOString(),
                        closeTime: new Date(closeTime).toISOString(),
                    },
                },
            });
        });
        await Promise.all(requests);
    }
}
