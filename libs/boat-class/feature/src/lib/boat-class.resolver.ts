import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { IBoatClassFeatureState } from './store/boat-class-feature.reducer';
import { BaseResolver } from '@processpuzzle/shared/base';

@Injectable() export class BoatClassResolver extends BaseResolver<BoatClass> {

  constructor( protected boatClassFacade: BoatClassFacade, protected store: Store<IBoatClassFeatureState> ) {
    super( boatClassFacade, store );
  }
}
