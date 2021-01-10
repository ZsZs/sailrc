import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from '../domain/auth-data';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( private router: Router,  private afAuth: AngularFireAuth ) {}

  getAuthState(): Observable<User> {
    return this.afAuth.authState;
  }

  signInWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword( authData.email, authData.password )
  }

  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  createUserWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword( authData.email, authData.password )

  }

  // protected, private helper methods
}
