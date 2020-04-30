import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { CartService } from 'shared/services/cart.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.cart$ = this.cartService.getCart();

/* BEFORE REFACTOR

    const user$ = this.authService.user$.pipe(map(u =>{ this.userId = u.uid; console.log('uuuuuuu', u);}));
    const cart$ = this.cartService.getCart().pipe(map(c => this.shoppingCart = c));

    this.subscription = forkJoin({ user$, cart$ })
      .subscribe((res) => {
        console.log('Non mi stampa nulla ma funziona--------------', res);
      }); */
  }
}
