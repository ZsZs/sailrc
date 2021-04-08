import { Injectable } from '@angular/core';
import { getParticipantById, IRaceDomainState, ParticipantFacadeBase } from '../store/race.state';
import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { MemoizedSelector, Store } from '@ngrx/store';
import { INITIAL_PARTICIPANT_VALUE, Participant } from '../domain/participant';

@Injectable({ providedIn: 'root' })
export class ParticipantFacade extends ParticipantFacadeBase implements IBaseEntityFacade<Participant>{
  readonly entityIdPathVariable: string;
  readonly lapIdPathVariable: string;
  readonly raceIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: Participant;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Participant, store );
    this.entityInfo = getEntityInfo( Participant );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.lapIdPathVariable = 'LapId';
    this.raceIdPathVariable = 'RaceId';
    this.initialEntityState = INITIAL_PARTICIPANT_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | Participant, Participant> {
    return getParticipantById( id );
  }
}
