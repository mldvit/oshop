import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
   appUser: AppUser;
   shoppingCart$: Observable<ShoppingCart>;


  constructor(public auth: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCart$ = this.cartService.getCart();
  }

  logOut() {
    this.auth.logout();
  }

}
