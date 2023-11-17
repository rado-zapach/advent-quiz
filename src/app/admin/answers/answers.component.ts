import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersComponent {

}
