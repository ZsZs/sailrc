import { Injectable } from '@angular/core';
import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { INITIAL_LAP_VALUE, Lap } from '../domain/lap';
import { MemoizedSelector, Store } from '@ngrx/store';
import { getLapById, LapFacadeBase, IRaceDomainState } from '../store/race.state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable({ providedIn: 'root'})
export class LapFacade extends LapFacadeBase implements IBaseEntityFacade<Lap>{
  readonly entityIdPathVariable: string;
  readonly raceIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: Lap;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Lap, store );
    this.entityInfo = getEntityInfo( Lap );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.raceIdPathVariable = 'RaceId';
    this.initialEntityState = INITIAL_LAP_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | Lap, Lap> {
    return getLapById( id );
  }
}
