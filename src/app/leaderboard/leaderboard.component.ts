import {CommonModule} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PlayerEmailPipe} from '../common/player-email.pipe';
import {SanitizerPipe} from '../common/sanitizer.pipe';
import {generateClient} from 'aws-amplify/api';
import {Ranking} from '../API.service';
import * as queries from '../../graphql/queries';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        PlayerEmailPipe,
        SanitizerPipe,
        MatProgressBarModule,
    ],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
    public readonly client = generateClient();
    public readonly displayedColumns = ['player', 'points', 'ratio'];
    public dataSource = new MatTableDataSource<Ranking>([]);
    public isLoading = signal(true);

    public async ngOnInit(): Promise<void> {
        const response = await this.client.graphql({
            query: queries.ranking,
        });
        this.dataSource.data = response.data.ranking;
        this.isLoading.set(false);
    }

    @ViewChild(MatSort) sort: MatSort | undefined;

    public ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }
}
