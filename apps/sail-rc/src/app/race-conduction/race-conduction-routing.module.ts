import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceConductionComponent } from './race-conduction.component';

const routes: Routes = [
  { path: '', component: RaceConductionComponent },
  { path: 'participant', loadChildren: () => import( '@sailrc/race/participant/feature').then( m => m.RaceParticipantModule )},
  { path: 'field', loadChildren: () => import( '@sailrc/race/field').then( m => m.RaceFieldModule )},
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceConductionRoutingModule { }
