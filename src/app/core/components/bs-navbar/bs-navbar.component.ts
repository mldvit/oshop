import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { CartService } from 'shared/services/cart.service';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
   appUser: AppUser;
   shoppingCart$: Observable<ShoppingCart>;


  constructor(public auth: AuthService,
              private router: Router,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCart$ = this.cartService.getCart();
  }

  logOut() {
    this.auth.logout();
  }

  learnRxJS(){
    this.router.navigate(['learning/RxJs']);
  }

  learn(){
    this.router.navigate(['learning/trails']);
  }
}
