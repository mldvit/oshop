import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    // subscription without unsubscrive we have a single instance in the DOM, is the root component
    auth.user$.subscribe( user => {
        if (user) {
          userService.save( user );
          router.navigate([localStorage.getItem('returnUrl')]);
        }});

  }
}
