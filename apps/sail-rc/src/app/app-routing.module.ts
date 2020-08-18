import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@sailrc/shared/authentication/domain';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component : HomeComponent, data: { breadcrumb: { label: 'Sail Race Control', info: 'home' }}},
  { path: 'race-planning', loadChildren: './race-planning/race-planning.module#RacePlanningModule', data: { breadcrumb: 'Plan Race'}},
  { path: 'race-conduction', loadChildren: './race-conduction/race-conduction.module#RaceConductionModule', data: { breadcrumb: 'Conduct Race'}},
  { path: 'race-analysis', loadChildren: './race-analysis/race-analysis.module#RaceAnalysisModule', data: { breadcrumb: 'Analyse Race'}}
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}

