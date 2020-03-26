import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacePlanningComponent } from './race-planning.component';

const routes: Routes = [
  { path: '', component: RacePlanningComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RacePlanningRoutingModule { }
