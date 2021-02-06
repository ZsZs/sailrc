import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class SailorFeatureFacade extends BaseFormFacade<Sailor> implements IEntityFormFacade<Sailor> {
  constructor( protected store: Store<never>, protected router: Router, sailorFacade: SailorFacade ) {
    super( Sailor, store, router, sailorFacade );
  }

  public navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/sailor/${id}/details`, returnTo );
  }
}
