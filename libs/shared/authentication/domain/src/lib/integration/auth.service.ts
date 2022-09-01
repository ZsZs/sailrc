import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { AuthData } from '../domain/auth-data';
import { Observable } from 'rxjs';
import { User } from '@processpuzzle/authentication/domain';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData: any;

  constructor(private router: Router, private firestore: AngularFirestore, private afAuth: AngularFireAuth, private ngZone: NgZone) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  signIn(authData: AuthData): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  signUp(authData: AuthData) {
    return this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // protected, private helper methods
  authLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email-address']);
      });
    });
  }
}
