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

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, raceDomainReducer )
  ],
  providers: [
    { provide: Race, useClass: RaceService },
    { provide: Registration, useClass: RegistrationService }
  ]
})
export class RaceDomainModule {
  static forFeature(): ModuleWithProviders<RaceDomainModule> {
    return {
      ngModule:  RaceDomainModule,
      providers: [RaceFacade, RegistrationFacade]
    }
  }
}
