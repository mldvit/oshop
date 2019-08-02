import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  constructor(private dbRealtime: AngularFireDatabase) {}

  getCategories() {
    return this.dbRealtime.list('/categories').valueChanges();
  }

}
