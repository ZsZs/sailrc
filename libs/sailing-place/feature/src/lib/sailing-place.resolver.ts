import { Injectable } from '@angular/core';
import { BaseResolver } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { SailingPlace, SailingPlaceFacade } from '@sailrc/sailing-place/domain';
import { ISailingPlaceFeatureState } from './sailing-place-feature.reducer';

@Injectable() export class SailingPlaceResolver extends BaseResolver<SailingPlace> {

  constructor( protected sailingPlaceFacade: SailingPlaceFacade, protected store: Store<ISailingPlaceFeatureState> ) {
    super( sailingPlaceFacade, store );
  }
}
