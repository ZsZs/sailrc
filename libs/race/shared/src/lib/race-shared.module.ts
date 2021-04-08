import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceSelectComponent } from './race-select/race-select.component';
import { RaceStatusbarComponent } from './race-statusbar/race-statusbar.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { RaceLapToolbarComponent } from './race-lap-toolbar/race-lap-toolbar.component';
import { LapSelectorComponent } from './lap-selector/lap-selector.component';
import { RaceDomainModule } from '@sailrc/race/domain';

@NgModule({
  declarations: [LapSelectorComponent, RaceSelectComponent, RaceStatusbarComponent, RaceLapToolbarComponent],
  exports: [LapSelectorComponent, RaceSelectComponent, RaceStatusbarComponent, RaceLapToolbarComponent],
  imports: [
    CommonModule,
    FlexModule,
    RaceDomainModule.forFeature(),
    SharedMaterialModule
  ],
})
export class RaceSharedModule {}
