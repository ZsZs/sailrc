import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { SailorDomainModule } from '@sailrc/sailor/domain';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { StoreModule } from '@ngrx/store';
import { YachtClubDomainModule } from '@sailrc/yacht-club/domain';
import { FEATURE_NAME, raceFeatureReducer } from './store/race-feature.reducer';
import { RaceFeatureComponent } from './race-feature.component';
import { RaceListComponent } from './list/race-list.component';
import { RaceTabsComponent } from './tabs/race-tabs.component';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceFeatureRoutingModule } from './race-feature-routing.module';
import { RaceStatusbarComponent } from './statusbar/race-statusbar.component';
import { RaceDomainModule } from '@sailrc/race/domain';
import { RaceResolver } from './race.resolver';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';
import { RegistrationResolver } from './registration/registration.resolver';
import { FlexModule } from '@angular/flex-layout';
import { RaceSelectComponent } from './select/race-select.component';

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceFeatureComponent,
    RaceListComponent,
    RaceStatusbarComponent,
    RaceSelectComponent,
    RaceTabsComponent,
    RegistrationDetailsComponent,
    RegistrationListComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    RaceDomainModule.forFeature(),
    RaceFeatureRoutingModule,
    SailorDomainModule.forFeature(),
    SharedMaterialModule,
    StoreModule.forFeature( FEATURE_NAME, raceFeatureReducer ),
    YachtClubDomainModule.forFeature(),
    FlexModule
  ],
  providers: [
    RaceResolver,
    RegistrationResolver
  ]
})
export class RaceFeatureModule {}
