import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { CartService } from 'shared/services/cart.service';


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
