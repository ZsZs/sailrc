import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassListComponent } from './list/boat-class-list.component';
import { BoatClassDetailsComponent } from './details/boat-class-details.component';
import { BoatClassResolver } from './boat-class.resolver';

const routes: Routes = [
  { path: '', component: BoatClassComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: BoatClassListComponent },
      { path: ':boatClassId/details', component: BoatClassDetailsComponent, resolve: { boatClass: BoatClassResolver }},
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class BoatClassFeatureRoutingModule {}

