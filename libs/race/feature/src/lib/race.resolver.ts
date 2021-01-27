import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { getRaceById, INITIAL_RACE_VALUE, Race, RaceFacade } from '@sailrc/race/domain';
import { IRaceFeatureState } from './store/race-feature.reducer';
import { EditEntity } from '@processpuzzle/shared/base';

@Injectable() export class RaceResolver implements Resolve<Race> {

  constructor( private raceFacade: RaceFacade, private store: Store<IRaceFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<Race> {
    const raceId = route.params[ 'raceId' ];
    if ( raceId === 'new' ) {
      const race: Race = INITIAL_RACE_VALUE;
      this.store.dispatch( new EditEntity<Race>( Race, race ));
      return from( [race]);
    } else {
      return this.store.pipe(
        select( getRaceById( raceId ) ),
        tap( race => {
          if ( !race ) {
            this.raceFacade.load({ id: raceId } );
          }
        } ),
        filter( race => !!race ),
        first(),
        tap( race => this.raceFacade.select( race )),
        tap( race => this.store.dispatch( new EditEntity( Race, race )))
      );
    }
  }
}
