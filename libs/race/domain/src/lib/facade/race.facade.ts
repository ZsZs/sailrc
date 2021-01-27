import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseEntityFacade } from '@processpuzzle/shared/base';
import { Race } from '../domain/race';
import { IRaceDomainState, RaceFacadeBase } from '../store/race.state';

@Injectable({ providedIn: 'root' })
export class RaceFacade extends RaceFacadeBase implements BaseEntityFacade<Race>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Race, store );
    this.entityIdPathVariable = 'raceId';
    this.entityName = 'race';
  }
}
