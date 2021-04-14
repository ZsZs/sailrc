import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { DOMAIN_NAME, raceDomainReducer } from './store/race.state';
import { Race } from './domain/race';
import { RaceService } from './integration/race.service';
import { RaceFacade } from './facade/race.facade';
import { Registration } from './domain/registration';
import { RegistrationService } from './integration/registration.service';
import { RegistrationFacade } from './facade/registration.facade';
import { LapFacade } from './facade/lap.facade';
import { LapService } from './integration/lap.service';
import { Lap } from './domain/lap';
import { Participant } from './domain/participant';
import { ParticipantService } from './integration/participant.service';
import { ParticipantFacade } from './facade/participant.facade';
import { RaceFieldMark } from './domain/race-field-mark';
import { RaceFieldMarkService } from './integration/race-field-mark.service';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, raceDomainReducer )
  ],
  providers: [
    { provide: Lap, useClass: LapService },
    { provide: Participant, useClass: ParticipantService },
    { provide: Race, useClass: RaceService },
    { provide: RaceFieldMark, useClass: RaceFieldMarkService },
    { provide: Registration, useClass: RegistrationService }
  ]
})
export class RaceDomainModule {
  static forFeature(): ModuleWithProviders<RaceDomainModule> {
    return {
      ngModule:  RaceDomainModule,
      providers: [LapFacade, ParticipantFacade, RaceFacade, RegistrationFacade]
    }
  }
}
