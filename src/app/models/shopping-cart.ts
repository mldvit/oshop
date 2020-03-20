import { Item } from './item';

export class ShoppingCart {

    constructor(public items: Array<Item>) {
        console.log(items);
    }

    get totalItemsCount(): number {
      return this.items.reduce((acc, item) => acc += item.quantity, 0);
    }
}
