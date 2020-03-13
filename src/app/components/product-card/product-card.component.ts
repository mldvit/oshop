import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Input() showActions = true;

  public quantity;
  private subscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getQuantity();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.getQuantity();
  }

  private getQuantity() {
    this.subscription = this.cartService.getItem(this.product.key).subscribe( res => {
      this.quantity = res[0] ? res[0].quantity : 0;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
