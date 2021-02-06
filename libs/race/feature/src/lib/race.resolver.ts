import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Race, RaceFacade } from '@sailrc/race/domain';
import { IRaceFeatureState } from './store/race-feature.reducer';
import { BaseResolver } from '@processpuzzle/shared/base';

@Injectable() export class RaceResolver extends BaseResolver<Race> {

  constructor( protected raceFacade: RaceFacade, protected store: Store<IRaceFeatureState> ) {
    super( raceFacade, store );
  }
}
