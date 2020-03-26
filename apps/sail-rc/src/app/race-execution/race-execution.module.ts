import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { CommonDependenciesModule } from '../common-dependencies.module';
import { RaceExecutionComponent } from './race-execution.component';
import { RaceExecutionRoutingModule } from './race-execution-routing.module';

@NgModule({
  declarations: [
    RaceExecutionComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    CommonDependenciesModule,
    RaceExecutionRoutingModule
  ]
})

export class RaceExecutionModule {}
