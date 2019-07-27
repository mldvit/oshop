import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {
    // subscription without unsubscrive we have a single instance in the DOM, is the root component
    auth.user$.subscribe(user => {if (user) { router.navigate([localStorage.getItem('returnUrl')]); }});

  }
}
