import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {generateClient} from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import {Ranking} from '../API.service';
import {PlayerEmailPipe} from '../common/player-email.pipe';
import {SanitizerPipe} from '../common/sanitizer.pipe';

interface RankingWithPos extends Ranking {
    position: number | undefined;
}

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
export class LeaderboardComponent implements OnInit {
    public readonly client = generateClient();
    public readonly displayedColumns = ['position', 'player', 'points', 'ratio'];
    public dataSource = new MatTableDataSource<RankingWithPos>([]);
    public isLoading = signal(true);

    public async ngOnInit(): Promise<void> {
        const response = await this.client.graphql({
            query: queries.ranking,
        });
        const rankings = response.data.ranking;
        rankings.sort((a, b) => b.points - a.points);
        let pos = 1;
        const data = rankings.map((r, i, all) => ({
            ...r,
            position: i == 0 ? pos : r.points === all[i - 1].points ? undefined : ++pos,
        }));

        this.dataSource.data = data;
        this.isLoading.set(false);
    }
}
