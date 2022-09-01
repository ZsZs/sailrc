import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, getIsAuthenticated, getRedirectTo } from '../store/auth.reducer';
import { setAuthenticated, setUnauthenticated } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { AuthService } from '../integration/auth.service';
import { AuthData } from '../domain/auth-data';
import firebase from 'firebase/compat/app';
import User = firebase.User;

@Injectable({ providedIn: 'root' })
export class AuthDomainFacade {
  constructor(private authService: AuthService, private store: Store<AuthState>) {}

  createUserWithEmailAndPassword(authData: AuthData): Promise<any> {
    return this.authService.signUp(authData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(getIsAuthenticated);
  }

  forgotPassword(passwordResetEmail) {
    return this.authService.forgotPassword(passwordResetEmail);
  }

  getAuthState(): Observable<User> {
    return this.authService.getAuthState();
  }

  getRedirectTo(): Observable<string> {
    return this.store.select(getRedirectTo);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  setAuthenticated(email: string, userId: string) {
    this.store.dispatch(setAuthenticated({ email, userId }));
  }

  setUnAuthenticated() {
    this.store.dispatch(setUnauthenticated());
  }

  signInWithEmailAndPassword(authData: AuthData): Promise<any> {
    return this.authService.signIn(authData);
  }

  signOut(): Promise<any> {
    return this.authService.signOut();
  }
}
