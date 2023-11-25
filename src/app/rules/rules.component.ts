import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-rules',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rules.component.html',
    styleUrl: './rules.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent {}
