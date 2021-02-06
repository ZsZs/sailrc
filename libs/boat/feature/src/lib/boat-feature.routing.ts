import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoatResolver } from './boat.resolver';
import { BoatComponent } from './boat.component';
import { BoatListComponent } from './list/boat-list.component';
import { BoatDetailsComponent } from './details/boat-details.component';

const routes: Routes = [
  { path: '', component: BoatComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: BoatListComponent },
      { path: ':BoatId/details', component: BoatDetailsComponent, resolve: { boat: BoatResolver }},
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class BoatFeatureRoutingModule {}

