import {Injectable} from '@angular/core';
import {fetchAuthSession, signInWithRedirect, signOut} from 'aws-amplify/auth';
import {catchError, from, map, Observable, of, shareReplay} from 'rxjs';

interface User {
    email: string | undefined;
    isAdmin: boolean;
}

@Injectable({providedIn: 'root'})
export class UserService {
    public readonly user$: Observable<User | undefined> = from(fetchAuthSession()).pipe(
        map(session => {
            // @ts-ignore
            const isAdmin = session.tokens.idToken.payload['cognito:groups'].includes('Admins');
            // @ts-ignore
            const email: string = session.tokens.idToken.payload['email'];
            return {
                email,
                isAdmin,
            };
        }),
        catchError(e => of(undefined)),
        shareReplay(1)
    );

    public isSignedIn(): Observable<boolean> {
        return this.user$.pipe(map(u => !!u));
    }

    public async signIn(): Promise<void> {
        try {
            return await signInWithRedirect({provider: 'Google'});
        } catch (e) {
            console.log(e);
        }
    }

    public async signOut(): Promise<void> {
        return await signOut();
    }
}
