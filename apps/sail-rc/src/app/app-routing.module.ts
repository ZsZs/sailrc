import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@sailrc/shared/authentication/domain';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component : HomeComponent, data: { breadcrumb: 'Sail Race Control' }},
  { path: 'race-planning', loadChildren: './race-planning/race-planning.module#RacePlanningModule', data: { breadcrumb: 'Race Planning'}},
  { path: 'race-conduction', loadChildren: './race-conduction/race-conduction.module#RaceConductionModule', data: { breadcrumb: 'Race Conduction'}},
  { path: 'race-analysis', loadChildren: './race-analysis/race-analysis.module#RaceAnalysisModule', data: { breadcrumb: 'Race Analysis'}}
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}

