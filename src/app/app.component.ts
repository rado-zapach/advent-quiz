import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from './common/user.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {PlayerAttributesService} from './common/player-attributes.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatListModule} from '@angular/material/list';
import {filter, of, Subject, switchMap} from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatSidenavModule,
        MatChipsModule,
        MatDividerModule,
        MatListModule,
        RouterLink,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public readonly userService = inject(UserService);
    public readonly playerAttributesService = inject(PlayerAttributesService);

    public readonly title$ = new Subject<string | undefined>();

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.playerAttributesService.attributes$.pipe(takeUntilDestroyed()).subscribe();

        router.events
            .pipe(
                filter(routeEvent => routeEvent instanceof NavigationEnd),
                switchMap(event => {
                    const slashesCount = ((event as NavigationEnd).url.match(/\//g) || []).length;
                    if (slashesCount === 1) {
                        return this.activatedRoute.firstChild?.data ?? of(undefined);
                    }
                    if (slashesCount === 2) {
                        return this.activatedRoute.firstChild?.firstChild?.data ?? of(undefined);
                    }

                    return of(undefined);
                }),
                takeUntilDestroyed()
            )
            .subscribe(data => {
                // @ts-ignore
                this.title$.next(data?.title);
            });
    }
}
