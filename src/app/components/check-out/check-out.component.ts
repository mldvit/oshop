import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  shoppingCart: ShoppingCart;
  subscription: Subscription;

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.cartService.getCart().subscribe((cart) => this.shoppingCart = cart);
   }

  placeOrder() {
    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.shoppingCart.items.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.price

        }
      })
    };

    this.orderService.storeOrder(order);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
