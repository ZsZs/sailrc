import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sailor } from './domain/sailor';
import { SailorService } from './integration/sailor.service';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature()
  ],
  providers: [
    { provide: Sailor, useClass: SailorService }
  ]
})
export class SailorDomainModule {}
