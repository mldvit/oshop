import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save( user: firebase.User ) {
    this.db.object('/users' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get( uid: string): AngularFireObject<AppUser> {
   return this.db.object('/users' + uid) ;
  }
}

/*
import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ml firebase-demo';

  items$: Observable<any[]>;
  courses$: AngularFireList<any>;
  itemsDocs$: Observable<any[]>;
  course$;
  author$;



  constructor(private dbRealtime: AngularFireDatabase,  dbCloud: AngularFirestore) {
    this.items$ = dbRealtime.list('/courses').valueChanges();
    this.courses$ = dbRealtime.list('/courses');
    this.course$ = dbRealtime.object('/courses/1').valueChanges();
    this.author$ = dbRealtime.object('/authors/1').valueChanges();

//    this.course$.subscribe(console.log);

    this.itemsDocs$ = dbCloud.collection('courses').valueChanges();

//     this.one$ = store.select("data").subscribe(data => // do something);
//    this.two$ = Observable.interval(1000).subscribe(data => // do something);

  }

  add(course: HTMLInputElement) {
    console.log("aggiungo: ", course.value);
    this.courses$.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components'},
        { title: 'Directives'},
        { title: 'Template'}
      ]
    });
    course.value = '';
  }

  update(course){
    console.log("update", course);
    this.dbRealtime.object('/courses/' + course).set(course + " UPDATED");
  }
  addItem(newName: string) {
    this.courses$.push({ text: newName });
  }

  updateItem(key: string, newText: string) {
    this.courses$.update(key, { text: newText });
  }

  deleteItem(key: string) {
    this.courses$.remove(key);
  }

  deleteEverything() {
    this.courses$.remove();
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy.");
//    this.one$.unsubscribe();
//    this.two$.unsubscribe(); 


*/