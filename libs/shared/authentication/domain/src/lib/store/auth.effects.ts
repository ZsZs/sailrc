import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { authenticateUser, setAuthenticated } from './auth.actions';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthState, getRedirectTo } from './auth.reducer';

@Injectable()
export class AuthEffects {
  authenticateUser$ = createEffect( () => this.actions$.pipe(
      ofType( authenticateUser ),
      tap( () => this.router.navigate( ['/login'] ))
    ),
    { dispatch: false }
  );

  setAuthenticated$ = createEffect( () => this.actions$.pipe(
      ofType( setAuthenticated ),
      tap( () => {
        this.store.select( getRedirectTo ).pipe( take( 1 )).subscribe( redirectTo => {
            if ( redirectTo ) return this.router.navigateByUrl( redirectTo );
          })
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private router: Router) {}
}
