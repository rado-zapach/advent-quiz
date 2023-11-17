import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-question',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {}
