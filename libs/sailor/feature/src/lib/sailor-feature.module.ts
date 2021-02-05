import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SailorFeatureComponent } from './sailor-feature.component';
import { SailorDetailsComponent } from './details/sailor-details.component';
import { SailorListComponent } from './list/sailor-list.component';
import { SailorTabsComponent } from './tabs/sailor-tabs.component';
import { SailorDomainModule, SailorFacade } from '@sailrc/sailor/domain';
import { YachtClubDomainModule, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { sailorFeatureReducer, FEATURE_NAME } from './store/sailor-feature.reducer';
import { SailorFeatureFacade } from './sailor-feature.facade';
import { SailorFeatureRoutingModule } from './sailor-feature-routing.module';
import { SailorResolver } from './sailor.resolver';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedBaseModule } from '@processpuzzle/shared/base';
import { FlexModule } from '@angular/flex-layout';
import { BoatDomainModule, BoatFacade } from '@sailrc/boat/domain';
import { YachtClubFeatureFacade } from '@sailrc/yacht-club/feature';
import { BoatFeatureFacade } from '@sailrc/boat/feature';

@NgModule({
  declarations: [
    SailorDetailsComponent,
    SailorFeatureComponent,
    SailorListComponent,
    SailorTabsComponent
  ],
  imports: [
    BoatDomainModule.forFeature(),
    CommonModule,
    MaterialFileInputModule,
    NgrxFormsModule,
    SailorDomainModule.forFeature(),
    SailorFeatureRoutingModule,
    SharedBaseModule,
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, sailorFeatureReducer ),
    YachtClubDomainModule.forFeature(),
    MatProgressBarModule,
    FlexModule
  ],
  providers: [
    BoatFacade,
    BoatFeatureFacade,
    SailorFacade,
    SailorFeatureFacade,
    SailorResolver,
    YachtClubFeatureFacade
  ]
})
export class SailorFeatureModule {
  static forFeature(): ModuleWithProviders<SailorFeatureModule> {
    return {
      ngModule: SailorFeatureModule,
      providers: [SailorFeatureFacade]
    }
  }
}
