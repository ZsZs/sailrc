import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';

import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';

import { BoatClass } from '../domain/boat-class';
import { BoatClassFacadeBase, getBoatClassById, IBoatClassState } from '../store/boat-class-domain.state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable({ providedIn: 'root' })
export class BoatClassFacade extends BoatClassFacadeBase implements IBaseEntityFacade<BoatClass>{
  readonly entityIdPathVariable: string;
  readonly entityInfo: IEntityInfo;

  constructor( protected store: Store<IBoatClassState> ) {
    super( BoatClass, store );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.entityInfo = getEntityInfo( BoatClass );
  }

  getEntityById( id: string ): MemoizedSelector<object | BoatClass, BoatClass> {
    return getBoatClassById( id );
  }
}
