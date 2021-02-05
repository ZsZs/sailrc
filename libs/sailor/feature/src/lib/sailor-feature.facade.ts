import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Sailor } from '@sailrc/sailor/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { YachtClub } from '@sailrc/yacht-club/domain';

@Injectable({providedIn: 'root'})
export class SailorFeatureFacade extends BaseFormFacade<Sailor> implements IEntityFormFacade<Sailor> {
  constructor( protected store: Store<any>, protected router: Router ) {
    super( Sailor, store, router );
  }

  public navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/sailor/${id}/details`, returnTo );
  }
}
