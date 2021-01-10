import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { routeChange, routerBack, routerForward, routerGo } from './router.actions';
import { BaseUrlSegments } from './base-url-segments';

@Injectable({ providedIn: 'root'} )
export class RouterFacade {

  constructor( private router: Router, private route: ActivatedRoute, private store: Store<any> ) {}

  // pubclic accessors
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
//    this.store.dispatch( routerGo({ path, queryParams, extras }));
    this.router.navigate( path, { queryParams, ...extras })
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '../' + entityId + '/' + BaseUrlSegments.DetailsForm;
  };
}
