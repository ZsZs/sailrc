import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassDetailsComponent } from './details/boat-class-details.component';
import { BoatClassListComponent } from './list/boat-class-list.component';
import { BoatClassTabsComponent } from './tabs/boat-class-tabs.component';
import { BoatClassDomainModule } from '@sailrc/boat-class/domain';
import { BoatClassFeatureRoutingModule } from './boat-class-feature-routing.module';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { StoreModule } from '@ngrx/store';
import { boatClassFeatureReducer, FEATURE_NAME } from './store/boat-class-feature.reducer';
import { NgrxFormsModule } from 'ngrx-forms';
import { BoatClassFeatureFacade } from './facade/boat-class-feature.facade';
import { BoatClassResolver } from './boat-class.resolver';


@NgModule({
  declarations: [
    BoatClassComponent,
    BoatClassDetailsComponent,
    BoatClassListComponent,
    BoatClassTabsComponent
  ],
  imports: [
    BoatClassDomainModule.forFeature(),
    BoatClassFeatureRoutingModule,
    CommonModule,
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, boatClassFeatureReducer ),
    NgrxFormsModule
  ],
  exports: [],
  providers: [BoatClassFeatureFacade, BoatClassResolver]
})

export class BoatClassFeatureModule {
  static forFeature(): ModuleWithProviders<BoatClassFeatureModule> {
    return {
      ngModule: BoatClassFeatureModule,
      providers: [BoatClassFeatureFacade]
    }
  }
}
