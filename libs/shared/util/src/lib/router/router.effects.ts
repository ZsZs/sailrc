import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { routeChange, routerGo } from './router.actions';

@Injectable()
export class RouterEffects {

  constructor( private actions$: Actions, private router: Router, private location: Location, private store: Store<never> ) {
    this.listenToRouter();
  }

  navigate$ = createEffect( () => this.actions$.pipe(
      ofType( routerGo ),
      tap(({ path, queryParams, extras }) => {
        return this.router.navigate( path, { queryParams, ...extras })
      })
    ),
  { dispatch: false }
  );

  navigateBack$ = createEffect( () => this.actions$.pipe(
      ofType('[Router] Back'),
      tap(() => this.location.back() )
    ),
    { dispatch: false }
  );

  navigateForward$ = createEffect( () => this.actions$.pipe(
      ofType('[Router] Forward'),
      tap(() => this.location.forward() )
    ),
   { dispatch: false }
  );

  private listenToRouter() {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd )
    ).subscribe((event: ActivationEnd ) => this.store.dispatch( routeChange({ params: { ...event.snapshot.params }, path: event.snapshot.routeConfig.path })));
  }
}
