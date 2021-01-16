import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

import { BoatClass } from './domain/boat-class';
import { BoatClassService } from './integration/boat-class.service';
import { DOMAIN_NAME, boatClassDomainReducer } from './store/boat-class-domain.state';
import { BoatClassFacade } from './facade/boat-class-facade';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, boatClassDomainReducer )
  ],
  providers: [
    { provide: BoatClass, useClass: BoatClassService }
  ]
})

export class BoatClassDomainModule {
  static forFeature(): ModuleWithProviders<BoatClassDomainModule> {
    return {
      ngModule:  BoatClassDomainModule,
      providers: [BoatClassFacade]
    }
  }

}
