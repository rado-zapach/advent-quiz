import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {generateClient} from 'aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import {Rules} from '../../API.service';

@Component({
    selector: 'app-edit-rules',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatProgressBarModule,
    ],
    templateUrl: './edit-rules.component.html',
    styleUrl: './edit-rules.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRulesComponent {
    public readonly client = generateClient();
    public readonly isLoading = signal(false);
    public rulesText;

    public constructor(@Inject(MAT_DIALOG_DATA) public readonly rules: Rules) {
        this.rulesText = rules?.text;
    }

    public async onSave(): Promise<void> {
        this.isLoading.set(true);
        this.rules
            ? await this.client.graphql({
                  query: mutations.updateRules,
                  variables: {
                      input: {
                          id: this.rules.id,
                          text: this.rulesText,
                      },
                  },
              })
            : await this.client.graphql({
                  query: mutations.createRules,
                  variables: {
                      input: {
                          text: this.rulesText,
                      },
                  },
              });
        this.isLoading.set(false);
    }
}
