import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@sailrc/shared/authentication/domain';

const appRoutes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'boat-class', loadChildren: () => import('@sailrc/boat/feature').then(m => m.BoatFeatureModule ) }
//  { path: 'race', loadChildren: './race/race.module#RaceModule'},
//  { path: 'race-analysis', loadChildren: './race/analysis/race-analysis.module#RaceAnalysisModule'},
//  { path: 'race-execution', loadChildren: './race/execution/race-execution.module#RaceExecutionModule'},
//  { path: 'sailor', loadChildren: './sailor/sailor.module#SailorModule'},
//  { path: 'yacht-club', loadChildren: './yacht-club/yacht-club.module#YachtClubModule'}
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}

