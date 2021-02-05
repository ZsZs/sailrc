import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Registration } from '@sailrc/race/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RegistrationFeatureFacade extends BaseFormFacade<Registration> implements IEntityFormFacade<Registration> {

  constructor( protected store: Store<any>, protected router: Router ) {
    super( Registration, store, router );
  }
}
