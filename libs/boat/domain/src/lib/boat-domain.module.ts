import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

import { BoatClass } from './domain/boat-class';
import { BoatClassService } from './integration/boat-class.service';
import { DOMAIN_NAME, boatDomainReducer } from './store/boat-domain.state';
import { BoatClassFacade } from './facade/boat-class-facade';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, boatDomainReducer )
  ],
  providers: [
    { provide: BoatClass, useClass: BoatClassService }
  ]
})

export class BoatDomainModule {
  static forFeature(): ModuleWithProviders<BoatDomainModule> {
    return {
      ngModule:  BoatDomainModule,
      providers: [BoatClassFacade]
    }
  }

}
