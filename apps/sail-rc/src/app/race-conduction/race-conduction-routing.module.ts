import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceConductionComponent } from './race-conduction.component';

const routes: Routes = [
  { path: '', component: RaceConductionComponent },
  { path: 'participant', loadChildren: () => import('@sailrc/race/participant/feature').then((m) => m.RaceParticipantModule) },
  { path: 'field', loadChildren: () => import('@sailrc/race/field').then((m) => m.RaceFieldModule) },
  { path: 'start', loadChildren: () => import('@sailrc/race/start').then((m) => m.RaceStartModule) },
  { path: 'finish', loadChildren: () => import('@sailrc/race/finish').then((m) => m.RaceFinishModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceConductionRoutingModule {}
