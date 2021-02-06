import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';

import { getEntityInfo, IBaseEntityFacade } from '@processpuzzle/shared/base';
import { YachtClub } from './yacht-club';
import { getYachtClubById, IYachtClubState, YachtClubFacadeBase } from './yacht-club.state';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Sailor } from '@sailrc/sailor/domain';


@Injectable({ providedIn: 'root' })
export class YachtClubFacade extends YachtClubFacadeBase implements IBaseEntityFacade<YachtClub>{
  readonly entityIdPathVariable: string;
  readonly entityInfo: IEntityInfo;

  constructor( protected store: Store<IYachtClubState> ) {
    super( YachtClub, store );
    this.entityInfo = getEntityInfo( YachtClub );
    this.entityIdPathVariable = this.entityInfo.modelName + 'Id';
  }

  getEntityById( id: string ): MemoizedSelector<object | YachtClub, YachtClub> {
    return getYachtClubById( id );
  }
}
