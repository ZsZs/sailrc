import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@processpuzzle/authentication/domain';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component : HomeComponent, data: { breadcrumb: { label: 'Sail Race Control', info: 'home' }}},
  { path: 'race-planning', loadChildren: () => import('./race-planning/race-planning.module').then( module => module.RacePlanningModule), data: { breadcrumb: 'Plan Race'}},
  { path: 'race-conduction', loadChildren: () => import( './race-conduction/race-conduction.module').then( module=> module.RaceConductionModule), data: { breadcrumb: 'Conduct Race'}},
  { path: 'race-analysis', loadChildren: () => import( './race-analysis/race-analysis.module').then( module => module.RaceAnalysisModule), data: { breadcrumb: 'Analyse Race'}}
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}

