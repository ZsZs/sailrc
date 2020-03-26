import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { CommonDependenciesModule } from '../common-dependencies.module';
import { RaceAnalysisRoutingModule } from './race-analysis-routing.module';
import { RaceAnalysisComponent } from './race-analysis.component';

@NgModule({
  declarations: [
    RaceAnalysisComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    CommonDependenciesModule,
    RaceAnalysisRoutingModule
  ]
})

export class RaceAnalysisModule {}
