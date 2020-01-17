import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/auth';

import { setAuthenticated, setUnauthenticated } from '../store/auth.actions';
import { SnackBarService, SpinnerService } from '@sailrc/shared/widgets';
import { AuthData } from './auth-data';
import { AuthState } from '../..';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
     private router: Router,
     private afAuth: AngularFireAuth,
     private snackBarService: SnackBarService,
     private spinnerService: SpinnerService,
     private store: Store<AuthState>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if ( user ) {
        this.authSuccess();
      } else {
        this.authFailed();
      }
    });
  }

  login( authData: AuthData ) {
    this.spinnerService.startLoading();
    this.afAuth.auth.signInWithEmailAndPassword( authData.email, authData.password )
       .then( result => {
         this.spinnerService.stopLoading();
         this.authSuccess();
       })
       .catch( error => {
         this.spinnerService.stopLoading();
         this.snackBarService.showSnackbar( error.message, null, 5000 );
         this.authFailed();
       });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch( setUnauthenticated() );
    this.router.navigate(['/']);
  }

  registerUser( authData: AuthData ) {
    this.spinnerService.startLoading();
    this.afAuth.auth.createUserWithEmailAndPassword( authData.email, authData.password )
       .then( result => {
         this.spinnerService.stopLoading();
       })
       .catch( error => {
         this.spinnerService.stopLoading();
         this.snackBarService.showSnackbar( error.message, null, 5000 );
       });
  }

  // protected, private helper methods
  private authFailed() {
    this.store.dispatch( setUnauthenticated() );
    this.router.navigate(['/login']);
  }

  private authSuccess() {
    this.store.dispatch( setAuthenticated() );
  }
}
