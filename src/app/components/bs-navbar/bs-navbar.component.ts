import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/app-user';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Item } from 'src/app/models/item';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
   appUser: AppUser;
   shoppingCart: ShoppingCart;


  constructor(public auth: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cartService.getCart().subscribe((fireBaseCart) => {
      let items: Array<Item> = [];
      for (const productId in fireBaseCart.items) {
        items.push(fireBaseCart.items[productId]);
      }
      this.shoppingCart = new ShoppingCart(items);
    }
    );
  }

  logOut() {
    this.auth.logout();
  }

}
