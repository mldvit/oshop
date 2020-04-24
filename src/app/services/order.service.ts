import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: CartService) { }

  // orchestrating
  placeOrder(order) {
    const res = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return res;
  }
}
