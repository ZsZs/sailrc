import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

import { routeChange, routerBack, routerForward, routerGo } from './router.actions';

@Injectable({ providedIn: 'root'} )
export class RouterFacade {

  constructor( private store: Store<any>) {}

  routerBack() {
    this.store.dispatch( routerBack() );
  }

  routeChange( params: any, path: string ) {
    this.store.dispatch( routeChange({ params, path }));
  }

  routerForward() {
    this.store.dispatch( routerForward() )
  }

  routerGo( path: string[], queryParams?: object, extras?: NavigationExtras ) {
    this.store.dispatch( routerGo({ path, queryParams, extras }));
  }
}
