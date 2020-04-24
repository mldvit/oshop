import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Shipping } from 'src/app/models/shipping.model';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, forkJoin } from 'rxjs';
import { map} from 'rxjs/operators';


@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input()
  cart: ShoppingCart;

  userId;
  subscription: Subscription;
  shipping : Shipping = new Shipping();

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const user$ = this.authService.user$.pipe(map(u =>{ this.userId = u.uid; console.log('uuuuuuu', u);}));

    this.subscription = user$
    .subscribe((res) => {
      console.log('ora ok', res);
    });
  }

  placeOrder() {
    this.orderService.placeOrder(new Order(this.userId, this.shipping, this.cart)).then((res) => {
      // $key to read a node from firebase
      // key when you store something
      this.router.navigate(['/order-success', res.key]);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
