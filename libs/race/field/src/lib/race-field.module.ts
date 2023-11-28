import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceFieldComponent } from './race-field.component';
import { MarkListComponent } from './mark-list/mark-list.component';
import { RaceFieldTabsComponent } from './race-field-tabs/race-field-tabs.component';
import { RaceDomainModule } from '@sailrc/race/domain';
import { RaceFieldRoutingModule } from './race-field-routing.module';
import { LapResolver, RaceSharedModule } from '@sailrc/race/shared';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { RaceResolver } from '@sailrc/race/feature';
import { SharedBaseModule } from '@processpuzzle/shared/base';
import { RaceFieldFeatureFacade } from './race-field-feature.facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormsModule } from '@angular/forms';
import { SharedWidgetsModule } from '@processpuzzle/shared/widgets';

@NgModule({
  declarations: [RaceFieldComponent, MarkListComponent, RaceFieldTabsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RaceDomainModule.forFeature(),
    RaceFieldRoutingModule,
    RaceSharedModule,
    SharedBaseModule,
    SharedMaterialModule,
    SharedWidgetsModule,
    FlexModule,
    NgrxFormsModule,
    FormsModule,
  ],
  providers: [LapResolver, RaceResolver, RaceFieldFeatureFacade],
  exports: [],
})
export class RaceFieldModule {}
