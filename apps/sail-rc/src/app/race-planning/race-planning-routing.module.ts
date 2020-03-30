import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacePlanningComponent } from './race-planning.component';

const routes: Routes = [
  { path: '', component: RacePlanningComponent },
  { path: 'boat-class', loadChildren: () => import( '@sailrc/boat/feature').then( m => m.BoatFeatureModule ) }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RacePlanningRoutingModule { }
