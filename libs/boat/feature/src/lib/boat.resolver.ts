import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseResolver } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { BoatFacade } from '@sailrc/boat/domain';
import { IBoatFeatureState } from './boat-feature.reducer';

@Injectable() export class BoatResolver extends BaseResolver<Boat> {

  constructor( protected boatFacade: BoatFacade, protected store: Store<IBoatFeatureState> ) {
    super( boatFacade, store );
  }
}
