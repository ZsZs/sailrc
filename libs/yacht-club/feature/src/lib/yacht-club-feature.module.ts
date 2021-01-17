import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { YachtClubComponent } from './yacht-club.component';
import { YachtClubDetailsComponent } from './details/yacht-club-details.component';
import { YachtClubListComponent } from './list/yacht-club-list.component';
import { YachtClubTabsComponent } from './tabs/yacht-club-tabs.component';

import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { YachtClubDomainModule, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { FEATURE_NAME, yachtClubFeatureReducer } from './yacht-club.reducer';
import { YachtClubFeatureRoutingModule } from './yacht-club-feature.routing';
import { YachtClubFeatureFacade } from './yacht-club-feature.facade';
import { YachtClubResolver } from './yacht-club.resolver';


@NgModule({
  declarations: [YachtClubComponent, YachtClubDetailsComponent, YachtClubListComponent, YachtClubTabsComponent],
  imports: [
    CommonModule,
    NgrxFormsModule,
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, yachtClubFeatureReducer ),
    YachtClubDomainModule.forFeature(),
    YachtClubFeatureRoutingModule
  ],
  exports: [],
  providers: [YachtClubFacade, YachtClubFeatureFacade, YachtClubResolver]
})
export class YachtClubFeatureModule {
  static forFeature(): ModuleWithProviders<YachtClubFeatureModule> {
    return {
      ngModule: YachtClubFeatureModule,
      providers: [YachtClubFeatureFacade]
    }
  }
}
