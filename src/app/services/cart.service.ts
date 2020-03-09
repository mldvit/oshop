import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('shopping-carts').push({ dateCreated: new Date().getTime() });
  }

  private getCart(cartId: string): Observable<Cart> {
    return this.db.object<Product>('/shopping-carts/' + cartId).valueChanges();
  }

  private getItem(cartId: string, productKey: string) {
    return this.db.list<Item>('/shopping-carts/' + cartId + '/items/', ref => ref.orderByChild('product/key')
                  .equalTo(productKey)
                  .limitToFirst(1))
                  .snapshotChanges()
                  .pipe(map(actions =>
                      actions.map(a => ({ key: a.key, ...a.payload.val() }))
                  ));
  }


  private getOrCreateCartId(): string {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    this.create().then(result => {
      localStorage.setItem('cartId', result.key);
      return result.key;
    });
  }

  private addItemToCart(cartId: string, product: Product) {
    this.db.list('/shopping-carts/' + cartId + '/items/')
          .push({ product, quantity: 1 })
          .catch(error => this.handleError(error));
  }

  private updateQuantityItemToCart(cartId: string, item: Item) {
    const itemUpdated = item;
    itemUpdated.quantity += 1;
    console.log('itemUpdated', itemUpdated);
    return this.db.object<Item>('/shopping-carts/' + cartId + '/items/' + item.key).update(itemUpdated);
  }



  addToCart(product: Product) {
    const cartId = this.getOrCreateCartId();
    console.log('cartId', cartId);
    const item$ = this.getItem(cartId, product.key);
    const subscription = item$.subscribe((res)  => {
          console.log('resItem', res);
          subscription.unsubscribe();
          if ( res && res.length > 0) {
            console.log('keyItem', res[0].key);
            console.log('update');
            this.updateQuantityItemToCart(cartId, res[0]);
          } else {
            console.log('insert');
            return this.addItemToCart(cartId, product);
          }
        }

    );

  }

  private handleError(error) {
    console.log(error);
  }

}

export class Cart {
}

/*
snapshotchanges mi ha anche la key
valuechanges solo i valori

https://firebase.google.com/docs/database/web/lists-of-data
https://firebase.google.com/docs/reference/node/firebase.database.DataSnapshot#foreach
https://blog.angular-university.io/angular-2-firebase/
https://fireship.io/lessons/reactive-crud-app-with-angular-and-firebase-tutorial/

https://console.firebase.google.com/project/mltrialapp/database/mltrialapp/data


admin.database().ref('/news').orderByChild('id').equalTo(postId).once('value').then(snapshot => {
  snapshot.forEach(child) {
    const post = child.val();
    post.id = child.key;

    console.log(post.id)
  }); */

/*
  // Assume we have the following data in the Database:
{
  "name": {
    "first": "Ada",
    "last": "Lovelace"
  }
}

var ref = firebase.database().ref("users/ada");
ref.once("value")
  .then(function(snapshot) {
    var a = snapshot.hasChildren(); // true
    var b = snapshot.child("name").hasChildren(); // true
    var c = snapshot.child("name/first").hasChildren(); // false
  }); */
