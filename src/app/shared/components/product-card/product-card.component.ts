import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { CartService } from 'shared/services/cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})

export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;
  @Input() showActions = true;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
