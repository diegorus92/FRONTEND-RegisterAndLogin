import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**Check when the user can activate a route accourding to a condition */
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  //If use is logged in, he can navigate to a protected route in app-routing.module
  if(authService.isLogged()) 
    return true;

    //else, the user logout and go to the principal route (login route in our case)
    console.log("AuthGuard: Not logged");
  authService.logout();
  router.navigate(['']);

  return false;
};
