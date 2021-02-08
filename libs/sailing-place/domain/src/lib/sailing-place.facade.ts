import { Injectable } from '@angular/core';
import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { MemoizedSelector, Store } from '@ngrx/store';
import { INITIAL_SAILING_PLACE_VALUE, SailingPlace } from './sailing-place';
import { ISailingPlaceState, SailingPlaceFacadeBase, getSailingPlaceById } from './sailing-place.state';

@Injectable({ providedIn: 'root' })
export class SailingPlaceFacade extends SailingPlaceFacadeBase implements IBaseEntityFacade<SailingPlace>{
  readonly entityIdPathVariable: string;
  readonly entityInfo: IEntityInfo;
  readonly initialEntityState: SailingPlace;

  constructor( protected store: Store<ISailingPlaceState> ) {
    super( SailingPlace, store );
    this.entityInfo = getEntityInfo( SailingPlace );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
    this.initialEntityState = INITIAL_SAILING_PLACE_VALUE;
  }


  getEntityById( id: string ): MemoizedSelector<object | SailingPlace, SailingPlace> {
    return getSailingPlaceById( id );
  }
}
