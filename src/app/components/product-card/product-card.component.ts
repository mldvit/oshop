import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {

  @Input() product: Product;

  @Input() showActions = true;

  constructor(private cartService: CartService) { }

  addToCart(product: Product) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.cartService.create()
        .then(result => {
          console.log(result);
          localStorage.setItem('cartId', result.key);
          // add product to cart
        });

    } else {
      // add product to cart
    }
  }

}
