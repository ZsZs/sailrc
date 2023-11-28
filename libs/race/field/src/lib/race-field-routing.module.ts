import { RouterModule, Routes } from '@angular/router';
import { RaceResolver } from '@sailrc/race/feature';
import { LapResolver } from '@sailrc/race/shared';
import { NgModule } from '@angular/core';
import { RaceFieldComponent } from './race-field.component';
import { MarkListComponent } from './mark-list/mark-list.component';

const routes: Routes = [
  {
    path: '',
    component: RaceFieldComponent,
    children: [
      { path: 'race/:RaceId/lap/:LapId', redirectTo: 'race/:RaceId/lap/:LapId/list', pathMatch: 'full' },
      { path: 'race/:RaceId/lap/:LapId/list', component: MarkListComponent, resolve: { race: RaceResolver, lap: LapResolver } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaceFieldRoutingModule {}
