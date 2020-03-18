import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
   appUser: AppUser;
   shoppingCartItemCount: number;

  constructor(public auth: AuthService, private cartService: CartService) {
  }
  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cartService.getCart().subscribe( shoppingCart => {
      console.log('shopping-cart', shoppingCart);
      this.shoppingCartItemCount = 0;
      for (let productId in shoppingCart.items) {
       this.shoppingCartItemCount += shoppingCart.items[productId].quantity;
      }
    });
  }

  logOut() {
    this.auth.logout();
  }

}
