import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Category } from 'shared/models/category.model';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {


  constructor(private dbRealtime: AngularFireDatabase) {}

  getAll() {
    return this.dbRealtime.list<Category>('/categories', ref =>
       ref.limitToLast(25).orderByChild('name') ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

}
