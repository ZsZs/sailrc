import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { SailingPlace, SailingPlaceFacade } from '@sailrc/sailing-place/domain';

@Injectable({providedIn: 'root'})
export class SailingPlaceFeatureFacade extends BaseFormFacade<SailingPlace> implements IEntityFormFacade<SailingPlace> {

  constructor( protected store: Store<never>, protected router: Router, protected sailingPlaceFacade: SailingPlaceFacade ) {
    super( SailingPlace, store, router, sailingPlaceFacade );
  }

  jumpToDetails( id: string, returnTo: string ) {
    this.navigateToDetails( `/race-planning/sailing-place/${id}/details`, returnTo )
  }
}
