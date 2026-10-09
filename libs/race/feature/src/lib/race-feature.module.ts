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
import { RaceDomainModule } from '@sailrc/race/domain';
import { RaceResolver } from './race.resolver';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';
import { RegistrationResolver } from './registration/registration.resolver';
import { FlexModule } from '@angular/flex-layout';
import { RaceSharedModule } from '@sailrc/race/shared';
import { BoatDomainModule } from '@sailrc/boat/domain';
import { SailorFeatureModule } from '@sailrc/sailor/feature';

@NgModule({
  declarations: [RaceDetailsComponent, RaceFeatureComponent, RaceListComponent, RaceTabsComponent, RegistrationDetailsComponent, RegistrationListComponent],
  imports: [
    BoatDomainModule.forFeature(),
    CommonModule,
    FlexModule,
    NgrxFormsModule,
    RaceDomainModule.forFeature(),
    RaceFeatureRoutingModule,
    RaceSharedModule,
    SailorDomainModule.forFeature(),
    SailorFeatureModule.forFeature(),
    SharedMaterialModule,
    StoreModule.forFeature(FEATURE_NAME, raceFeatureReducer),
    YachtClubDomainModule.forFeature(),
  ],
  providers: [RaceResolver, RegistrationResolver],
})
export class RaceFeatureModule {}
