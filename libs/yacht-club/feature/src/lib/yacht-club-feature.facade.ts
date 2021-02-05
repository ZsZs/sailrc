import { Injectable } from '@angular/core';

import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';

import { YachtClub } from '@sailrc/yacht-club/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class YachtClubFeatureFacade extends BaseFormFacade<YachtClub> implements IEntityFormFacade<YachtClub> {

  constructor( protected store: Store<any>, protected router: Router ) {
    super( YachtClub, store, router );
  }

  navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/yacht-club/${id}/details`, returnTo );
  }
}
