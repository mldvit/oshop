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

  static of(fbSc: FireBaseShoppingCart) {
    console.log('fbShoppingCart', fbSc);
   // explicity map from firebase di angular class 
    const items: Array<Item> = [];
    for (const pippo in fbSc.items) {
      if (fbSc.items.hasOwnProperty(pippo)) {
        console.log('pippo', pippo);
        items.push(fbSc.items[pippo]);
      }
    }
    return new ShoppingCart(items);
  }
}

// firebase model
export interface FireBaseShoppingCart {
  items: { [key: string]: Item; };
}

