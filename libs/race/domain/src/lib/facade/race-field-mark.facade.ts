import { Injectable } from '@angular/core';
import { getRaceFieldMarkById, IRaceDomainState, RaceFieldMarkFacadeBase } from '../store/race.state';
import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { MemoizedSelector, Store } from '@ngrx/store';
import { INITIAL_MARK_VALUE, RaceFieldMark } from '../domain/race-field-mark';

@Injectable({ providedIn: 'root' })
export class RaceFieldMarkFacade extends RaceFieldMarkFacadeBase implements IBaseEntityFacade<RaceFieldMark>{
  readonly entityIdPathVariable: string;
  readonly lapIdPathVariable: string;
  readonly raceIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: RaceFieldMark;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( RaceFieldMark, store );
    this.entityInfo = getEntityInfo( RaceFieldMark );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.lapIdPathVariable = 'LapId';
    this.raceIdPathVariable = 'RaceId';
    this.initialEntityState = INITIAL_MARK_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | RaceFieldMark, RaceFieldMark> {
    return getRaceFieldMarkById( id );
  }
}
