import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Registration, RegistrationFacade } from '@sailrc/race/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RegistrationFeatureFacade extends BaseFormFacade<Registration> implements IEntityFormFacade<Registration> {
  private readonly _raceIdPathVariable;

  constructor( protected store: Store<never>, protected router: Router, registrationFacade: RegistrationFacade ) {
    super( Registration, store, router, registrationFacade );
    this._raceIdPathVariable = registrationFacade.raceIdPathVariable;
  }

  // region properties
  get raceIdPathVariable(): string {
    return this._raceIdPathVariable;
  }
  // endregion
}
