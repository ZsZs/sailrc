import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { EditEntity } from '@processpuzzle/shared/base';
import { getSailorById, INITIAL_SAILOR_VALUE, Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { ISailorFeatureState } from './store/sailor-feature.reducer';

@Injectable() export class SailorResolver implements Resolve<Sailor> {

  constructor( private sailorFacade: SailorFacade, private store: Store<ISailorFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<Sailor> {
    const idParam = 'sailorId';
    const sailorId = route.params[ idParam ];
    if ( sailorId === 'new' ) {
      const sailor: Sailor = INITIAL_SAILOR_VALUE;
      this.store.dispatch( new EditEntity<Sailor>( Sailor, sailor ));
      return from( [sailor]);
    } else {
      return this.store.pipe(
        select( getSailorById( sailorId ) ),
        tap( sailor => {
          if ( !sailor ) {
            this.sailorFacade.load({ id: sailorId } );
          }
        } ),
        filter( sailor => !!sailor ),
        first(),
        tap( sailor => {
          this.store.dispatch( new EditEntity( Sailor, sailor ) )
        } )
      );
    }
  }
}
