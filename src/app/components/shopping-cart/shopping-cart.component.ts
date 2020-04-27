import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { CartService } from 'shared/services/cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart$ = this.cartService.getCart();
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
