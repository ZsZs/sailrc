import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { EditEntity } from '@processpuzzle/shared/base';
import { getRaceById, getRegistrationById, INITIAL_REGISTRATION_VALUE, Race, RaceFacade, Registration, RegistrationFacade } from '@sailrc/race/domain';
import { IRaceFeatureState } from '../store/race-feature.reducer';

@Injectable() export class RegistrationResolver implements Resolve<Registration | Race> {

  constructor( private raceFacade: RaceFacade, private registrationFacade: RegistrationFacade, private store: Store<IRaceFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<Registration | Race> {
    return this.resolveRegistration( route );
  }

  // protected, private helper methods
  private resolveRegistration( route: ActivatedRouteSnapshot ): Observable<Registration> {
    const raceId = route.params[ 'raceId' ];
    const registrationId = route.params[ 'registrationId' ];
    if ( registrationId === 'new' ) {
      const registration: Registration = { ...INITIAL_REGISTRATION_VALUE, raceId };
      this.store.dispatch( new EditEntity<Registration>( Registration, registration ) );
      return from( [ registration ] );
    } else {
      return this.store.select( getRegistrationById( registrationId )).pipe(
        tap( registration => {
          if ( !registration ) {
            return this.registrationFacade.load( { id: registrationId }, raceId );
          }
        }),
        filter( registration => !!registration ),
        first(),
        tap( registration => this.registrationFacade.select( registration )),
        tap( registration => this.store.dispatch( new EditEntity( Registration, registration ) ))
      );
    }
  }
}
