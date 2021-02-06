import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceResolver } from './race.resolver';
import { RaceListComponent } from './list/race-list.component';
import { RaceFeatureComponent } from './race-feature.component';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';
import { RegistrationResolver } from './registration/registration.resolver';

const routes: Routes = [
  { path: '', component: RaceFeatureComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: RaceListComponent },
      { path: ':RaceId/details', component: RaceDetailsComponent, resolve: { race: RaceResolver } },
      { path: ':RaceId/registration/list', component: RegistrationListComponent, resolve: { race: RaceResolver } },
      { path: ':RaceId/registration/:RegistrationId/details', component: RegistrationDetailsComponent,
        resolve: { race: RaceResolver, registration: RegistrationResolver } },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceFeatureRoutingModule {}
