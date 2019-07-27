import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // si mostrano implementation detail di firebase
  // fare classe custom User e mappare oggetto firebase in questa
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute) {
     this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  logout() {
    this.afAuth.auth.signOut();
  }

}
