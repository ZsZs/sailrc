import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceConductionComponent } from './race-conduction.component';

const routes: Routes = [
  { path: '', component: RaceConductionComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceConductionRoutingModule { }
