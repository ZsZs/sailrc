import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SailorDetailsComponent } from './details/sailor-details.component';
import { SailorListComponent } from './list/sailor-list.component';
import { SailorFeatureComponent } from './sailor-feature.component';
import { SailorResolver } from './sailor.resolver';

const routes: Routes = [
  { path: '', component: SailorFeatureComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SailorListComponent },
      { path: ':SailorId/details', component: SailorDetailsComponent, resolve: { sailor: SailorResolver } },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class SailorFeatureRoutingModule {}
