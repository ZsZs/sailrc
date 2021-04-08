import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceParticipantListComponent } from './list/race-participant-list.component';
import { RaceDomainModule } from '@sailrc/race/domain';
import { RaceParticipantRoutingModule } from './race-participant-routing.module';
import { RaceParticipantTabsComponent } from './race-participant-tabs/race-participant-tabs.component';
import { LapResolver, RaceSharedModule } from '@sailrc/race/shared';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { RaceResolver, RegistrationResolver } from '@sailrc/race/feature';
import { RaceParticipantCaptureComponent } from './race-participant-capture/race-participant-capture.component';
import { RaceParticipantComponent } from './race-participant.component';
import { RegistrationSourceListComponent } from './registration-source-list/registration-source-list.component';
import { RegistrationSourceService } from './registration-source-list/registration-source.service';

@NgModule({
  declarations: [
    RaceParticipantCaptureComponent,
    RaceParticipantComponent,
    RaceParticipantListComponent,
    RaceParticipantTabsComponent,
    RegistrationSourceListComponent
  ],
  imports: [
    CommonModule,
    RaceDomainModule.forFeature(),
    RaceParticipantRoutingModule,
    RaceSharedModule,
    SharedMaterialModule
  ],
  providers: [
    LapResolver,
    RaceResolver,
    RegistrationResolver,
    RegistrationSourceService
  ],
  exports: []
})
export class RaceParticipantModule {}
