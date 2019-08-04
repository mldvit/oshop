import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {


  constructor(private dbRealtime: AngularFireDatabase) {}

  getCategories() {
    return this.dbRealtime.list<Category>('/categories').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      ));
  }

}
