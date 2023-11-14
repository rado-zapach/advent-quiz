import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterOutlet} from '@angular/router';
import {Auth, CognitoHostedUIIdentityProvider} from "@aws-amplify/auth";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {CognitoUser} from "amazon-cognito-identity-js";
import {catchError, from, map, of} from "rxjs";
import {ZenObservable} from "zen-observable-ts";
import {APIService, Todo} from "./API.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AmplifyAuthenticatorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public createForm: FormGroup;
  public todos: Array<Todo> = [];
  private subscription: ZenObservable.Subscription | null = null;

  public user$ = from(Auth.currentAuthenticatedUser()).pipe(map((user: CognitoUser) => user.getUsername()), catchError(err => of(console.log(err))));

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.api.ListTodos().then(event => {
      this.todos = event.items as Todo[];
    });

    this.subscription = this.api.OnCreateTodoListener().subscribe(
      (event: any) => {
        const newTodo = event.value.data.onCreateTodo;
        this.todos = [newTodo, ...this.todos];
      }
    );
  }

  public onCreate(todo: Todo) {
    this.api
      .CreateTodo(todo)
      .then(() => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating item...', e);
      });
  }

  public openGoogleAuth(): void {
    console.log(1);
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google });
  }

  public signOut(): void {
    Auth.signOut();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }
}
