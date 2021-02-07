import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';

import { IBaseEntityFacade, getEntityInfo } from '@processpuzzle/shared/base';
import { getSailorById, ISailorState, SailorFacadeBase } from '../store/sailor.state';
import { INITIAL_SAILOR_VALUE, Sailor } from '../domain/sailor';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable({ providedIn: 'root' })
export class SailorFacade extends SailorFacadeBase implements IBaseEntityFacade<Sailor>{
  entityIdPathVariable: string;
  entityInfo: IEntityInfo;
  readonly initialEntityState: Sailor;

  constructor( protected store: Store<ISailorState> ) {
    super( Sailor, store );
    this.entityInfo = getEntityInfo( Sailor );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.initialEntityState = INITIAL_SAILOR_VALUE;
  }

  getEntityById( id: string ): MemoizedSelector<object | Sailor, Sailor> {
    return getSailorById( id );
  }
}
