import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseEntityFacade } from '@processpuzzle/shared/base';
import { YachtClub } from './yacht-club';
import { IYachtClubState, YachtClubFacadeBase } from './yacht-club.state';


@Injectable({ providedIn: 'root' })
export class YachtClubFacade extends YachtClubFacadeBase implements BaseEntityFacade<YachtClub>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<IYachtClubState> ) {
    super( YachtClub, store );
    this.entityIdPathVariable = 'yachtClubId';
    this.entityName = 'yachtClub';
  }
}
