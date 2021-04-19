import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Participant, ParticipantFacade } from '@sailrc/race/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RaceParticipantFeatureFacade extends BaseFormFacade<Participant> implements IEntityFormFacade<Participant>{
  private readonly _lapIdPathVariable;
  private readonly _raceIdPathVariable;

  constructor( protected store: Store<any>, protected router: Router, participantFacade: ParticipantFacade  ) {
    super( Participant, store, router, participantFacade );
    this._lapIdPathVariable = participantFacade.lapIdPathVariable;
    this._raceIdPathVariable = participantFacade.raceIdPathVariable;
  }

  // region public accessors and mutators
  navigateToRecognize( detailsFormPath: string, returnTo?: string ) {
    if( !returnTo ) { returnTo = this.router.url; }
    this.router.navigateByUrl( detailsFormPath );
  }
  // endregion

  // region properties
  get lapIdPathVariable(): string {
    return this._lapIdPathVariable;
  }

  get raceIdPathVariable(): string {
    return this._raceIdPathVariable;
  }
  // endregion
}
