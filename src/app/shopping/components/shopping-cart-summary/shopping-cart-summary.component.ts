import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.sass']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input()
  cart: ShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
