import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from '../domain/auth-data';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( private router: Router,  private afAuth: AngularFireAuth ) {}

  getAuthState(): Observable<User> {
    return this.afAuth.authState;
  }

  signInWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword( authData.email, authData.password )
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  createUserWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword( authData.email, authData.password )

  }

  // protected, private helper methods
}
