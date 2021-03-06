import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product.model';
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

  getAll(): Observable<Array<Product>> {
    return this.db.list<Product>('/products', ref =>
      ref.limitToLast(25).orderByChild('title')).snapshotChanges().pipe(map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

  get(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product: Product) {
    return this.db.object<Product>('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object<Product>('/products/' + productId).remove();
  }
}
