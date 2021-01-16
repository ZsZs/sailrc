import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { boatDomainReducer, DOMAIN_NAME } from './boat-state';
import { Boat } from './boat';
import { BoatFacade } from './boat-facade';
import { BoatService } from './boat.service';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, boatDomainReducer )
  ],
  providers: [
    { provide: Boat, useClass: BoatService }
  ]
})

export class BoatDomainModule {
  static forFeature(): ModuleWithProviders<BoatDomainModule> {
    return {
      ngModule:  BoatDomainModule,
      providers: [BoatFacade]
    }
  }

}
