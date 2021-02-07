import { Injectable } from '@angular/core';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { IEntityFormFacade } from '@processpuzzle/shared/base';
import { BaseFormFacade } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class BoatClassFeatureFacade extends BaseFormFacade<BoatClass> implements IEntityFormFacade<BoatClass> {

  constructor( protected store: Store<any>, protected router: Router, boatClassFacade: BoatClassFacade ) {
    super( BoatClass, store, router, boatClassFacade );
  }

  jumpToDetails( id: string, returnTo: string ) {
    this.navigateToDetails( `/race-planning/boat-class/${id}/details`, returnTo )
  }
}
