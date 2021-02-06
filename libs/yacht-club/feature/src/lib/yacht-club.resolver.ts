import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseResolver } from '@processpuzzle/shared/base';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { IYachtClubFeatureState } from './yacht-club.reducer';

@Injectable() export class YachtClubResolver extends BaseResolver<YachtClub> {

  constructor( protected yachtClubFacade: YachtClubFacade, protected store: Store<IYachtClubFeatureState> ) {
    super( yachtClubFacade, store );
  }
}
