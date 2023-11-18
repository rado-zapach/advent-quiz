import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {generateClient} from 'aws-amplify/api';
import * as queries from '../../graphql/queries';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    public readonly client = generateClient();

    public async getQuestions(): Promise<void> {
        // const response = await this.client.graphql({
        //     query: queries.listQuestions,
        // });
        const response = await this.client.graphql({
            query: queries.playerQuestionList,
        });
        console.log(response);
    }
}
