import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ParticipantFacade, Registration, RegistrationFacade } from '@sailrc/race/domain';
import { map } from 'rxjs/operators';

@Injectable() export class RegistrationSourceService {

  constructor( private registrationService: RegistrationFacade, private participantService: ParticipantFacade ) {}

  loadAll(): Observable<Registration[]> {
    return combineLatest( [this.registrationService.all$, this.participantService.all$] ).pipe(
      map( ([registrations, participants]) => {
        registrations.map( registration => {
          if( participants.filter( participant => participant.registrationId == registration.id ).length > 0 ){
            registrations[registrations.indexOf( registration )] = {...registration, isParticipant: true }
          } else {
            registrations[registrations.indexOf( registration )] = {...registration, isParticipant: false }
          }
        })
        return registrations;
      })
    );
  }
}
