import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})

export class ProductQuantityComponent {

  @Input() item: Item;
  /* set item(inputItem) {
    console.log("inputItem", inputItem);
    this.item = inputItem;
  } */

  constructor(private cartService: CartService) {
   }

  addToCart() {
    this.cartService.addToCart(this.item.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item.product);
  }

}
