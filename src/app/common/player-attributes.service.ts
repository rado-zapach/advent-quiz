import {inject, Injectable} from '@angular/core';
import {generateClient} from 'aws-amplify/api';
import {map, shareReplay, switchMap} from 'rxjs';
import * as queries from '../../graphql/queries';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class PlayerAttributesService {
    public readonly attributes$ = inject(UserService).user$.pipe(
        switchMap(() =>
            generateClient().graphql({
                query: queries.playerAttributesList,
            })
        ),
        map(response => response.data.playerAttributesList),
        shareReplay(1)
    );
}
