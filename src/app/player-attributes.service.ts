import {Injectable} from '@angular/core';
import {generateClient} from 'aws-amplify/api';
import {from, map, shareReplay} from 'rxjs';
import * as queries from '../graphql/queries';

@Injectable({providedIn: 'root'})
export class PlayerAttributesService {
    public readonly attributes$ = from(
        generateClient().graphql({
            query: queries.playerAttributesList,
        })
    ).pipe(
        map(response => response.data.playerAttributesList),
        shareReplay(1)
    );
}
