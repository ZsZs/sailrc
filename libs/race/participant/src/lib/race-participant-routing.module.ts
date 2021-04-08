import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RaceParticipantComponent } from './race-participant.component';
import { RaceParticipantListComponent } from './list/race-participant-list.component';
import { RaceResolver } from '@sailrc/race/feature';
import { RaceParticipantCaptureComponent } from './race-participant-capture/race-participant-capture.component';
import { RegistrationSourceListComponent } from './registration-source-list/registration-source-list.component';
import { LapResolver } from '@sailrc/race/shared';

const routes: Routes = [
  { path: '', component: RaceParticipantComponent, children: [
    { path: 'race/:RaceId/lap/:LapId', redirectTo: 'race/:RaceId/lap/:LapId/list', pathMatch: 'full' },
    { path: 'race/:RaceId/lap/:LapId/list', component: RaceParticipantListComponent, resolve: { race: RaceResolver, lap: LapResolver } },
    { path: 'race/:RaceId/lap/:LapId/capture', component: RaceParticipantCaptureComponent, resolve: { race: RaceResolver, lap: LapResolver } },
    { path: 'race/:RaceId/lap/:LapId/registrations', component: RegistrationSourceListComponent, resolve: { race: RaceResolver, lap: LapResolver } },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceParticipantRoutingModule {}
