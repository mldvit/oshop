import { Product } from './product';

export class Item {

    constructor( public key: string, public quantity: number, public product: Product) {}

    get price(): number {
      return this.product.price * this.quantity;
    }
  }
