import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create( product: Product ) {
    return this.db.list('products').push(product);
 //   return this.db.object('/products').update(product);
  }

}
