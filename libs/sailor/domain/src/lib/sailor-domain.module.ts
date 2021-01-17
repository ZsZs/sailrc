import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sailor } from './domain/sailor';
import { SailorService } from './integration/sailor.service';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { DOMAIN_NAME, sailorDomainReducer } from './store/sailor.state';
import { SailorFacade } from './facade/sailor.facade';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, sailorDomainReducer )
  ],
  providers: [
    { provide: Sailor, useClass: SailorService }
  ]
})
export class SailorDomainModule {
  static forFeature(): ModuleWithProviders<SailorDomainModule> {
    return {
      ngModule:  SailorDomainModule,
      providers: [SailorFacade]
    }
  }
}
