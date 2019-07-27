import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {


  constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
      return this.auth.user$.pipe( map(user => {
        if (user) { return true; }
        this.router.navigate(['/login']);
        return false;
      }
        ));
     }
}


