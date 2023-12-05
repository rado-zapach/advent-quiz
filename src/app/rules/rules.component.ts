import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {generateClient} from 'aws-amplify/api';
import {first} from 'rxjs';
import * as queries from '../../graphql/queries';
import {EditRulesComponent} from '../admin/edit-rules/edit-rules.component';
import {Rules} from '../API.service';
import {SanitizerPipe} from '../common/sanitizer.pipe';
import {UserService} from '../common/user.service';

@Component({
    selector: 'app-rules',
    standalone: true,
    imports: [CommonModule, SanitizerPipe, MatButtonModule],
    templateUrl: './rules.component.html',
    styleUrl: './rules.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent implements OnInit {
    public userService = inject(UserService);
    public dialog = inject(MatDialog);
    public readonly client = generateClient();
    public readonly rules = signal<Rules | undefined>(undefined);

    public async ngOnInit(): Promise<void> {
        await this.fetchRules();
    }

    private async fetchRules(): Promise<void> {
        const result = await this.client.graphql({
            query: queries.listRules,
            variables: {
                limit: 1000000,
            },
        });
        const rules = result.data.listRules.items;
        if (rules.length > 0) {
            this.rules.set(rules[0]);
        }
    }

    public onEdit(): void {
        const dialog = this.dialog.open(EditRulesComponent, {
            data: this.rules(),
            width: '80vw',
            height: '70vh',
        });
        dialog
            .afterClosed()
            .pipe(first())
            .subscribe(() => this.fetchRules());
    }
}
