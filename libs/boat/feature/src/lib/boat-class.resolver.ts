import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { BoatClass, BoatClassFacade, getBoatClassById } from '@sailrc/boat/domain';
import { IBoatFeatureState } from './store/boat-feature.reducer';
import { EditEntity } from '@sailrc/shared/base';

@Injectable() export class BoatClassResolver implements Resolve<BoatClass> {

  constructor( private boatClassFacade: BoatClassFacade, private store: Store<IBoatFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<BoatClass> {
    const idParam = 'boatClassId';
    const boatClassId = route.params[ idParam ];
    if ( boatClassId === 'new' ) {
      const boatClass: BoatClass = {
        id: undefined,
        name: '',
        yardstick: undefined
      };
      this.store.dispatch( new EditEntity<BoatClass>( BoatClass, boatClass ));
      return from( [boatClass]);
    } else {
      return this.store.pipe(
        select( getBoatClassById( boatClassId ) ),
        tap( boatClass => {
          if ( !boatClass ) {
            this.boatClassFacade.load({ id: boatClassId } );
          }
        } ),
        filter( boatClass => !!boatClass ),
        first(),
        tap( boatClass => {
          this.store.dispatch( new EditEntity( BoatClass, boatClass ) )
        } )
      );
    }
  }
}
