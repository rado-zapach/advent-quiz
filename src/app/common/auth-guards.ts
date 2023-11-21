import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';

export const isSignedInGuard: CanActivateFn = async (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const isSignedIn = await inject(UserService).isSignedIn();
    return isSignedIn ? true : router.createUrlTree(['/login']);
};
