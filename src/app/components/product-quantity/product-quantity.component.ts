import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})

export class ProductQuantityComponent {

  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;
 // @Input() item: Item;
 
  /*
  @Input()
  set input(inputItem) {
    console.log("inputItem", inputItem);
    this.item = inputItem;
  } */

  constructor(private cartService: CartService) {
   }

   addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

/* 
  addToCart() {
    this.cartService.addToCart(this.item.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item.product);
  } */

}
