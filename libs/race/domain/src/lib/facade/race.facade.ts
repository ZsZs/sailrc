import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';

import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { INITIAL_RACE_VALUE, Race } from '../domain/race';
import { getRaceById, IRaceDomainState, RaceFacadeBase } from '../store/race.state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable({ providedIn: 'root' })
export class RaceFacade extends RaceFacadeBase implements IBaseEntityFacade<Race>{
  readonly entityIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: Race;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Race, store );
    this.entityInfo = getEntityInfo( Race );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.initialEntityState = INITIAL_RACE_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | Race, Race> {
    return getRaceById( id );
  }
}
