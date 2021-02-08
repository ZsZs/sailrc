import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SailingPlaceComponent } from './sailing-place.component';
import { SailingPlaceListComponent } from './list/sailing-place-list.component';
import { SailingPlaceDetailsComponent } from './details/sailing-place-details.component';
import { SailingPlaceResolver } from './sailing-place.resolver';

const routes: Routes = [
  { path: '', component: SailingPlaceComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SailingPlaceListComponent },
      { path: ':SailingPlaceId/details', component: SailingPlaceDetailsComponent, resolve: { sailingPlace: SailingPlaceResolver }},
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class SailingPlaceFeatureRoutingModule {}

