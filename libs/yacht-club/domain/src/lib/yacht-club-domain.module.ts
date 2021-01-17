import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { DOMAIN_NAME, yachtClubDomainReducer } from './yacht-club.state';
import { YachtClubService } from './yacht-club.service.';
import { YachtClub } from './yacht-club';
import { BoatFacade } from '@sailrc/boat/domain';

@NgModule({
  imports: [
    CommonModule,
    NgrxAutoEntityModule.forFeature(),
    StoreModule.forFeature( DOMAIN_NAME, yachtClubDomainReducer )
  ],
  providers: [
    { provide: YachtClub, useClass: YachtClubService }
  ]
})

export class YachtClubDomainModule {
  static forFeature(): ModuleWithProviders<YachtClubDomainModule> {
    return {
      ngModule:  YachtClubDomainModule,
      providers: [BoatFacade]
    }
  }
}
