import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create( product: Product ) {
    return this.db.list('products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products', ref =>
      ref.limitToLast(25).orderByChild('title')).snapshotChanges().pipe(map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

  get(productId): Observable<Product> {
/*     return this.db.list<Product>('/products/' + productId, ref =>
    ref.limitToLast(1)).snapshotChanges().pipe(map(actions =>
      actions.map(a => ({ key: a.key, ...a.payload.val() }))[0]
    )); */
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }
}
