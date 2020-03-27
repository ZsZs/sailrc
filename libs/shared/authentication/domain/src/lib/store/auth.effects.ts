import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { authenticateUser, setAuthenticated } from './auth.actions';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthState, getRedirectTo } from './auth.reducer';

@Injectable()
export class AuthEffects {
  @Effect({dispatch: false}) authenticateUser = this.actions$.pipe(
    ofType( authenticateUser ),
    tap( action => {
        this.router.navigate( ['/login'] );
    }));

  @Effect({dispatch: false}) setAuthenticated = this.actions$.pipe(
    ofType( setAuthenticated ),
    tap( action => {
      this.store.select( getRedirectTo ).pipe( take( 1 )).subscribe( redirectTo => {
        if ( redirectTo ) {
          this.router.navigateByUrl( redirectTo );
        }
      });
    }));

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private router: Router) {}
}
