import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacePlanningComponent } from './race-planning.component';

const routes: Routes = [
  { path: '', component: RacePlanningComponent },
  { path: 'boat', loadChildren: () => import( '@sailrc/boat/feature').then( m => m.BoatFeatureModule ) },
  { path: 'boat-class', loadChildren: () => import( '@sailrc/boat-class/feature').then( m => m.BoatClassFeatureModule ) },
  { path: 'race', loadChildren: () => import( '@sailrc/race/feature').then( m => m.RaceFeatureModule ) },
  { path: 'sailor', loadChildren: () => import( '@sailrc/sailor/feature').then( m => m.SailorFeatureModule ) },
  { path: 'sailing-place', loadChildren: () => import( '@sailrc/sailing-place/feature').then( m => m.SailingPlaceFeatureModule ) },
  { path: 'yacht-club', loadChildren: () => import( '@sailrc/yacht-club/feature').then( m => m.YachtClubFeatureModule ) }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RacePlanningRoutingModule { }
