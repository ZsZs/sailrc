import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { EditEntity } from '@processpuzzle/shared/base';
import { Boat, getBoatById } from '@sailrc/boat/domain';
import { BoatFacade } from '@sailrc/boat/domain';
import { IBoatFeatureState } from './boat-feature.reducer';

@Injectable() export class BoatResolver implements Resolve<Boat> {

  constructor( private boatFacade: BoatFacade, private store: Store<IBoatFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<Boat> {
    const idParam = 'boatId';
    const boatId = route.params[ idParam ];
    if ( boatId === 'new' ) {
      const boat: Boat = {
        id: undefined,
        name: '',
        sailNumber: '',
        boatClass: ''
      };
      this.store.dispatch( new EditEntity<Boat>( Boat, boat ));
      return from( [boat]);
    } else {
      return this.store.pipe(
        select( getBoatById( boatId ) ),
        tap( boat => {
          if ( !boat ) {
            this.boatFacade.load({ id: boatId } );
          }
        } ),
        filter( boat => !!boat ),
        first(),
        tap( boat => {
          this.store.dispatch( new EditEntity( Boat, boat ) )
        } )
      );
    }
  }
}
