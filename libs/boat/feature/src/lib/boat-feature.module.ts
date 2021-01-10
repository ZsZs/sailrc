import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassDetailsComponent } from './details/boat-class-details.component';
import { BoatClassListComponent } from './list/boat-class-list.component';
import { BoatClassTabsComponent } from './tabs/boat-class-tabs.component';
import { BoatDomainModule } from '@sailrc/boat/domain';
import { BoatFeatureRoutingModule } from './boat-feature-routing.module';
import { SharedMaterialModule } from '@sailrc/shared/material';
import { boatFeatureReducer, FEATURE_NAME } from './store/boat-feature.reducer';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { BoatClassResolver } from './boat-class.resolver';
import { BoatClassFeatureFacade } from './facade/BoatClassFeatureFacade';

@NgModule({
  declarations: [
    BoatClassComponent,
    BoatClassDetailsComponent,
    BoatClassListComponent,
    BoatClassTabsComponent
  ],
  imports: [
    BoatDomainModule.forFeature(),
    BoatFeatureRoutingModule,
    CommonModule,
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, boatFeatureReducer ),
    NgrxFormsModule
  ],
  exports: [],
  providers: [BoatClassFeatureFacade, BoatClassResolver]
})

export class BoatFeatureModule {
  static forFeature(): ModuleWithProviders<BoatFeatureModule> {
    return {
      ngModule: BoatFeatureModule,
      providers: [BoatClassFeatureFacade]
    }
  }
}
