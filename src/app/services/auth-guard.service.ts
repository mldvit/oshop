import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  route: ActivatedRouteSnapshot;
  path: ActivatedRouteSnapshot[];

  constructor( private auth: AuthService,
               private router: Router) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.auth.user$.pipe( map(user => {
        if (user) { return true; }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
        ));
     }
}


