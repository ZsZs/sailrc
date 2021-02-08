import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';

import { DOMAIN_NAME, sailingPlaceDomainReducer} from './sailing-place.state';
import { SailingPlace } from './sailing-place';
import { SailingPlaceService } from './sailing-place.service';
import { BoatFacade } from '@sailrc/boat/domain';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, sailingPlaceDomainReducer )
    ],
  providers: [
    { provide: SailingPlace, useClass: SailingPlaceService }
  ]
})
export class SailingPlaceDomainModule {
  static forFeature(): ModuleWithProviders<SailingPlaceDomainModule> {
    return {
      ngModule:  SailingPlaceDomainModule,
      providers: [BoatFacade]
    }
  }
}
