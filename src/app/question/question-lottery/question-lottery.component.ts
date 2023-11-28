import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WheelComponent} from '../../wheel/wheel.component';

@Component({
    selector: 'app-question-lottery',
    standalone: true,
    imports: [CommonModule, WheelComponent],
    templateUrl: './question-lottery.component.html',
    styleUrl: './question-lottery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionLotteryComponent {}
