import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from '../user.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public readonly userService = inject(UserService);
}
