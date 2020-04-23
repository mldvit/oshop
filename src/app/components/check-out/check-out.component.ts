import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { map} from 'rxjs/operators';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  shoppingCart: ShoppingCart;
  subscription: Subscription;
  userId;

  constructor(private authService: AuthService, private cartService: CartService, private orderService: OrderService) { }

  ngOnInit() {
    const user$ = this.authService.user$.pipe(map(u =>{ this.userId = u.uid; console.log("uuuuuuu", u);}));
    const cart$ = this.cartService.getCart().pipe(map(c => this.shoppingCart = c));

    this.subscription = forkJoin({ user$, cart$ })
      .subscribe((res) => {
        console.log("Non mi stampa nulla ma funziona--------------", res);
      });
  }

  placeOrder() {
    const order = {
      userId: this.userId,
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
