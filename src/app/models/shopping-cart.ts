import { Item } from './item';

export class ShoppingCart {

  constructor(public items: Array<Item>) {
    console.log('itemArray', this.items);
  }

    get totalItemsCount(): number {
      return this.items.reduce((acc, item) => acc += item.quantity, 0);
    }

    get productIds() {
      return Object.keys(this.items);
    }
}
