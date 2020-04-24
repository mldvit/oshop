import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { map} from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { Shipping } from 'src/app/models/shipping.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping : Shipping = new Shipping();
  shoppingCart: ShoppingCart;
  subscription: Subscription;
  userId;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit() {
    const user$ = this.authService.user$.pipe(map(u =>{ this.userId = u.uid; console.log('uuuuuuu', u);}));
    const cart$ = this.cartService.getCart().pipe(map(c => this.shoppingCart = c));

    this.subscription = forkJoin({ user$, cart$ })
      .subscribe((res) => {
        console.log('Non mi stampa nulla ma funziona--------------', res);
      });
  }

  placeOrder() {
    this.orderService.storeOrder(new Order(this.userId, this.shipping, this.shoppingCart)).then((res) => {
      // $key to read a node from firebase
      // key when you store something
      this.router.navigate(['/order-success', res.key]);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
