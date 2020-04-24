import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { switchMap } from  'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }
}

