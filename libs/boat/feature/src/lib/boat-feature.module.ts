import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { BoatFeatureRoutingModule } from './boat-feature.routing';
import { BoatDomainModule } from '@sailrc/boat/domain';
import { FEATURE_NAME, boatFeatureReducer } from './boat-feature.reducer';
import { BoatFeatureFacade } from './boat-feature.facade';
import { BoatResolver } from './boat.resolver';
import { BoatDetailsComponent } from './details/boat-details.component';
import { BoatListComponent } from './list/boat-list.component';
import { BoatTabsComponent } from './tabs/boat-tabs.component';
import { BoatComponent } from './boat.component';
import { BoatClassDomainModule, BoatClassFacade } from '@sailrc/boat-class/domain';
import { FlexModule } from '@angular/flex-layout';
import { SharedBaseModule } from '@processpuzzle/shared/base';

@NgModule({
  declarations: [
  BoatDetailsComponent,
  BoatListComponent,
  BoatTabsComponent,
  BoatComponent],
  imports: [
    BoatDomainModule.forFeature(),
    BoatClassDomainModule.forFeature(),
    BoatFeatureRoutingModule,
    CommonModule,
    FlexModule,
    NgrxFormsModule,
    SharedBaseModule,
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, boatFeatureReducer )
  ],
  exports: [],
  providers: [BoatClassFacade, BoatFeatureFacade, BoatResolver]
})

export class BoatFeatureModule {
  static forFeature(): ModuleWithProviders<BoatFeatureModule> {
    return {
      ngModule: BoatFeatureModule,
      providers: [BoatFeatureFacade]
    }
  }
}
