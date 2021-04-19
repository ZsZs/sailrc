import { RouterModule, Routes } from '@angular/router';
import { RaceResolver } from '@sailrc/race/feature';
import { LapResolver } from '@sailrc/race/shared';
import { NgModule } from '@angular/core';
import { RaceStartComponent } from './race-start.component';
import { RaceStartTimerComponent } from './race-start-timer/race-start-timer.component';
import { RaceStartCaptureComponent } from './race-start-capture/race-start-capture.component';

const routes: Routes = [
  { path: '', component: RaceStartComponent, children: [
      { path: 'race/:RaceId/lap/:LapId', redirectTo: 'race/:RaceId/lap/:LapId/list', pathMatch: 'full' },
      { path: 'race/:RaceId/lap/:LapId/list', component: RaceStartTimerComponent, resolve: { race: RaceResolver, lap: LapResolver } },
      { path: 'race/:RaceId/lap/:LapId/capture', component: RaceStartCaptureComponent, resolve: { race: RaceResolver, lap: LapResolver } }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceStartRoutingModule {}
