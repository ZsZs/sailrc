import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceAnalysisComponent } from './race-analysis.component';

const routes: Routes = [
  { path: '', component: RaceAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceAnalysisRoutingModule { }
