import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs';
import {UserService} from './user.service';

export const isSignedInGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    return inject(UserService)
        .isSignedIn()
        .pipe(map(is => (is ? true : router.createUrlTree(['/login']))));
};
