import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'app-shopping-card-summary',
  templateUrl: './shopping-card-summary.component.html',
  styleUrls: ['./shopping-card-summary.component.sass']
})
export class ShoppingCardSummaryComponent implements OnInit {
  @Input()
  cart: ShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
