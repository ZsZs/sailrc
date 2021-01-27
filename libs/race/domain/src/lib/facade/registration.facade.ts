import { Injectable } from '@angular/core';
import { BaseEntityFacade } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Registration } from '../domain/registration';
import { IRaceDomainState, RegistrationFacadeBase } from '../store/race.state';

@Injectable({ providedIn: 'root' })
export class RegistrationFacade extends RegistrationFacadeBase implements BaseEntityFacade<Registration>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<IRaceDomainState> ) {
    super( Registration, store );
    this.entityIdPathVariable = 'registrationId';
    this.entityName = 'registration';
  }

}
