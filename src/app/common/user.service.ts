import {Injectable} from '@angular/core';
import {
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser,
    signInWithRedirect,
    signOut,
} from 'aws-amplify/auth';
import {catchError, combineLatest, map, Observable, of, shareReplay} from 'rxjs';

interface User {
    id: string;
    email: string | undefined;
    isAdmin: boolean;
}

@Injectable({providedIn: 'root'})
export class UserService {
    public readonly user$: Observable<User | undefined> = combineLatest([
        getCurrentUser(),
        fetchUserAttributes(),
        fetchAuthSession(),
    ]).pipe(
        map(data => {
            let isAdmin = false;
            try {
                // @ts-ignore
                isAdmin = data[2].tokens.accessToken.payload['cognito:groups'].includes('Admins');
            } catch (e) {
                console.log(e);
            }
            const {username, userId, signInDetails} = data[0];
            const attributes = data[1];
            return {
                id: userId,
                email: attributes.email,
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
