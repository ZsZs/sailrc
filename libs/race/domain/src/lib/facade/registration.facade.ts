import { Injectable } from '@angular/core';
import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { MemoizedSelector, Store } from '@ngrx/store';
import { INITIAL_REGISTRATION_VALUE, Registration } from '../domain/registration';
import { getRegistrationById, IRaceDomainState, RegistrationFacadeBase } from '../store/race.state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Sailor } from '@sailrc/sailor/domain';

@Injectable({ providedIn: 'root' })
export class RegistrationFacade extends RegistrationFacadeBase implements IBaseEntityFacade<Registration>{
  readonly entityIdPathVariable: string;
  readonly raceIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: Registration;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Registration, store );
    this.entityInfo = getEntityInfo( Registration );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.raceIdPathVariable = 'RaceId';
    this.initialEntityState = INITIAL_REGISTRATION_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | Registration, Registration> {
    return getRegistrationById( id );
  }
}
