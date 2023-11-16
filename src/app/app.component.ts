import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';
import {TodosComponent} from './todos/todos.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'amplifyapp';
}