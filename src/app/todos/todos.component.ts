import {Component, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import {ListTodosQuery, Todo} from '../API.service';

@Component({
    standalone: true,
    selector: 'app-todos',
    imports: [ReactiveFormsModule],
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
    // @ts-ignore
    public todos: ListTodosQuery['listTodos']['items'] = [];
    public createForm: FormGroup;
    public client = generateClient();

    constructor(private fb: FormBuilder) {
        this.createForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.client
            .graphql({
                query: subscriptions.onCreateTodo,
            })
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: event => {
                    const newTodo: Todo = event.data.onCreateTodo;
                    this.todos = [newTodo, ...this.todos];
                },
            });
    }

    async ngOnInit() {
        /* fetch todos when app loads */
        try {
            const response = await this.client.graphql({
                query: queries.listTodos,
            });
            this.todos = response.data.listTodos.items;
        } catch (e) {
            console.log('error fetching todos', e);
        }
    }

    public async onCreate(todo: Todo) {
        try {
            const response = await this.client.graphql({
                query: mutations.createTodo,
                variables: {
                    input: todo,
                },
            });
            console.log('item created!', response);
            this.createForm.reset();
        } catch (e) {
            console.log('error creating todo...', e);
        }
    }
}
