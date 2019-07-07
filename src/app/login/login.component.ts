import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(public afAuth: AngularFireAuth) {

   }

  login() {
    console.log('login before');
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    console.log('login after');
  }

}
