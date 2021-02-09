import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SailingPlaceComponent } from './sailing-place.component';
import { SailingPlaceDetailsComponent } from './details/sailing-place-details.component';
import { SailingPlaceTabsComponent } from './tabs/sailing-place-tabs.component';
import { SailingPlaceListComponent } from './list/sailing-place-list.component';
import { FlexModule } from '@angular/flex-layout';
import { NgrxFormsModule } from 'ngrx-forms';
import { SharedBaseModule } from '@processpuzzle/shared/base';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, sailingPlaceFeatureReducer } from './sailing-place-feature.reducer';
import { SailingPlaceResolver } from './sailing-place.resolver';
import { SailingPlaceDomainModule } from '@sailrc/sailing-place/domain';
import { SailingPlaceFeatureRoutingModule } from './sailing-place-feature-routing.module';
import { SailingPlaceFeatureFacade } from './sailing-place-feature.facade';
import { SharedWidgetsModule } from '@processpuzzle/shared/widgets';

@NgModule({
  declarations: [
    SailingPlaceComponent,
    SailingPlaceDetailsComponent,
    SailingPlaceTabsComponent,
    SailingPlaceListComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    NgrxFormsModule,
    SailingPlaceDomainModule.forFeature(),
    SailingPlaceFeatureRoutingModule,
    SharedBaseModule,
    SharedMaterialModule,
    SharedWidgetsModule,
    StoreModule.forFeature( FEATURE_NAME, sailingPlaceFeatureReducer )
  ],
  exports: [],
  providers: [SailingPlaceResolver]
})
export class SailingPlaceFeatureModule {
  static forFeature(): ModuleWithProviders<SailingPlaceFeatureModule> {
    return {
      ngModule: SailingPlaceFeatureModule,
      providers: [SailingPlaceFeatureFacade]
    }
  }
}
