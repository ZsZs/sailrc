import { Injectable } from '@angular/core';

import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';

import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class YachtClubFeatureFacade extends BaseFormFacade<YachtClub> implements IEntityFormFacade<YachtClub> {

  constructor( protected store: Store<never>, protected router: Router, yachtClubFacade: YachtClubFacade ) {
    super( YachtClub, store, router, yachtClubFacade );
  }

  jumpToDetails( id: string, returnTo: string ) {
    this.navigateToDetails( `/race-planning/yacht-club/${id}/details`, returnTo )
  }
}
