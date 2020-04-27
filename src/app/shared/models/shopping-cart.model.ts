import { Item } from './item.model';
import { Product } from './product.model';

export class ShoppingCart {

  constructor(public items: Array<Item>) {
    console.log('itemArray', this.items);
  }

    get totalItemsCount(): number {
      return this.items.reduce((acc, item) => acc += item.quantity, 0);
    }

    get totalPrice(): number {
      return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }

  static of(fbSc: FireBaseShoppingCart) {
    console.log('fbShoppingCart', fbSc);
   // explicity map from firebase di angular class 
    const items: Array<Item> = [];
    for (const pippo in fbSc.items) {
      if (fbSc.items.hasOwnProperty(pippo)) {
        console.log('pippo', pippo);
        items.push(new Item(fbSc.items[pippo].key, fbSc.items[pippo].quantity, fbSc.items[pippo].product));
      }
    }
    return new ShoppingCart(items);
  }

  getQuantity(product: Product): number {
    console.log('getQuantity');
    const item = this.items.find( i => i.product.key === product.key);
    return item ? item.quantity : 0;
  }

  /*     not used just to remember how to deal with object/map in js
    get productIds() {
      return Object.keys(this.items);
    } */
}

// firebase model
export interface FireBaseShoppingCart {
  items: { [key: string]: Item; };
}

