import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { inject } from '@angular/core';
import { AuthService } from "../services";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isLoggedIn()) {
        return true;
    }
    return router.createUrlTree(['/login']);
}