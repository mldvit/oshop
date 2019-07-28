import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent  {
   appUser: AppUser;

  constructor(public auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logOut() {
    this.auth.logout();
  }

}
