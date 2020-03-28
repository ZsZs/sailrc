import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, getIsAuthenticated, getRedirectTo } from '../store/auth.reducer';
import { setAuthenticated, setUnauthenticated } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthService } from '../integration/auth.service';
import { AuthData } from '../domain/auth-data';

@Injectable({ providedIn: 'root'})
export class AuthDomainFacade {

  constructor( private authService: AuthService, private store: Store<AuthState>) {}

  createUserWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.authService.createUserWithEmailAndPassword( authData );
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select( getIsAuthenticated );
  }

  getAuthState(): Observable<User> {
    return this.authService.getAuthState();
  }

  getRedirectTo(): Observable<string> {
    return this.store.select( getRedirectTo );
  }

  setAuthenticated( email: string, userId: string ) {
    this.store.dispatch( setAuthenticated({ email, userId }));
  }

  setUnAuthenticated() {
    this.store.dispatch( setUnauthenticated() );
  }

  signInWithEmailAndPassword( authData: AuthData ): Promise<any> {
    return this.authService.signInWithEmailAndPassword( authData );
  }

  signOut(): Promise<any> {
    return this.authService.signOut();
  }
}
