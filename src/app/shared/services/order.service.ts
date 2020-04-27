import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CartService } from 'shared/services/cart.service';
import { Order } from 'shared/models/order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getOrders(){
    return this.db.list<Order>('/orders').snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

  getOrdersByUser(userId: string) {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }
}
