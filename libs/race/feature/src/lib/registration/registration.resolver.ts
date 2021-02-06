import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseResolver } from '@processpuzzle/shared/base';
import { Registration, RegistrationFacade } from '@sailrc/race/domain';
import { IRaceFeatureState } from '../store/race-feature.reducer';

@Injectable() export class RegistrationResolver extends BaseResolver<Registration> {

  constructor( protected registrationFacade: RegistrationFacade, protected store: Store<IRaceFeatureState> ) {
    super( registrationFacade, store );
  }
}
