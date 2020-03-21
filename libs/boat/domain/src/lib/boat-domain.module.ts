import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature()
  ]
})
export class BoatDomainModule {}
