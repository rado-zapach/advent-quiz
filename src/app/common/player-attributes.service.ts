import {inject, Injectable} from '@angular/core';
import {generateClient} from 'aws-amplify/api';
import {map, shareReplay, switchMap, tap} from 'rxjs';
import * as queries from '../../graphql/queries';
import {PlayerAttributes} from '../API.service';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class PlayerAttributesService {
    public attributes: PlayerAttributes[] = [];
    public readonly attributes$ = inject(UserService).user$.pipe(
        switchMap(() =>
            generateClient().graphql({
                query: queries.playerAttributesList,
            })
        ),
        map(response => response.data.playerAttributesList),
        tap(attr => (this.attributes = attr)),
        shareReplay(1)
    );

    public getUsername(email: string): string {
        const attr = this.attributes?.find(a => a.email === email);
        if (!attr) {
            throw new Error();
        }
        return attr.username;
    }

    public getEmail(username: string): string {
        const attr = this.attributes?.find(a => a.username === username);
        if (!attr) {
            throw new Error();
        }
        return attr.email;
    }
}
