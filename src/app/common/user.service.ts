import {Injectable} from '@angular/core';
import {fetchUserAttributes, getCurrentUser, signInWithRedirect, signOut} from 'aws-amplify/auth';

interface User {
    id: string;
    email: string | undefined;
}

@Injectable({providedIn: 'root'})
export class UserService {
    public async getUser(): Promise<User | undefined> {
        try {
            const {username, userId, signInDetails} = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            return {
                id: userId,
                email: attributes.email,
            };
        } catch (err) {
            return undefined;
        }
    }

    public async isSignedIn(): Promise<boolean> {
        try {
            await getCurrentUser();
            return true;
        } catch (e) {
            return false;
        }
    }

    public async signIn(): Promise<void> {
        return await signInWithRedirect({provider: 'Google'});
    }

    public async signOut(): Promise<void> {
        return await signOut();
    }
}
