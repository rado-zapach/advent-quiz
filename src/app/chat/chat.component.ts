import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import {ChatMessage} from '../API.service';
import {PlayerEmailPipe} from '../common/player-email.pipe';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TextFieldModule,
        FormsModule,
        MatButtonModule,
        PlayerEmailPipe,
    ],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
    public readonly client = generateClient();
    public readonly chatMessages = signal<ChatMessage[]>([]);

    public async ngOnInit(): Promise<void> {
        const result = await this.client.graphql({
            query: queries.listChatMessages,
        });
        this.chatMessages.set(result.data.listChatMessages.items);
    }

    public async onMessageSend(input: HTMLInputElement): Promise<void> {
        await this.client.graphql({
            query: mutations.createChatMessage,
            variables: {
                input: {
                    text: input.value,
                },
            },
        });
        input.value = '';
    }
}
