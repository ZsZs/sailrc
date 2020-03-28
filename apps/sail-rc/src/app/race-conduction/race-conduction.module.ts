import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { CommonDependenciesModule } from '../common-dependencies.module';
import { RaceConductionComponent } from './race-conduction.component';
import { RaceConductionRoutingModule } from './race-conduction-routing.module';

@NgModule({
  declarations: [
    RaceConductionComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    CommonDependenciesModule,
    RaceConductionRoutingModule
  ]
})

export class RaceConductionModule {}
