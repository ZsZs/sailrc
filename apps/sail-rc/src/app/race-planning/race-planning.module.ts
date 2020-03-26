import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { CommonDependenciesModule } from '../common-dependencies.module';
import { RacePlanningComponent } from './race-planning.component';
import { RacePlanningRoutingModule } from './race-planning-routing.module';

@NgModule({
  declarations: [
    RacePlanningComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    CommonDependenciesModule,
    RacePlanningRoutingModule
  ]
})

export class RacePlanningModule {}
