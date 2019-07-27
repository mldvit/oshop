import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // si mostrano implementation detail di firebase
  // fare classe custom User e mappare oggetto firebase in questa
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
     this.user$ = afAuth.authState;
   }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
