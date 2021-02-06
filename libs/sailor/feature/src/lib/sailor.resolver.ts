import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseResolver } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { ISailorFeatureState } from './store/sailor-feature.reducer';

@Injectable() export class SailorResolver extends BaseResolver<Sailor> {

  constructor( protected sailorFacade: SailorFacade, protected store: Store<ISailorFeatureState> ) {
    super( sailorFacade, store );
  }
}
