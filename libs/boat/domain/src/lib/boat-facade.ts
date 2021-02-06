import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';

import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { Boat } from './boat';
import { BoatFacadeBase, getBoatById, IBoatState } from './boat-state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable({ providedIn: 'root' })
export class BoatFacade extends BoatFacadeBase implements IBaseEntityFacade<Boat>{
  readonly entityIdPathVariable: string;
  readonly entityInfo: IEntityInfo;

  constructor( protected store: Store<IBoatState> ) {
    super( Boat, store );
    this.entityInfo = getEntityInfo( Boat );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
  }


  getEntityById( id: string ): MemoizedSelector<object | Boat, Boat> {
    return getBoatById( id );
  }
}
