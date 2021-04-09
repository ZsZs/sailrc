import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceSelectorComponent } from './race-selector/race-selector.component';
import { RaceStatusbarComponent } from './race-statusbar/race-statusbar.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { RaceLapToolbarComponent } from './race-lap-toolbar/race-lap-toolbar.component';
import { LapSelectorComponent } from './lap-selector/lap-selector.component';
import { RaceDomainModule } from '@sailrc/race/domain';
import { RaceLapContainerComponent } from './race-lap-container/race-lap-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LapSelectorComponent,
    RaceLapContainerComponent,
    RaceLapToolbarComponent,
    RaceSelectorComponent,
    RaceStatusbarComponent
  ],
  exports: [
    LapSelectorComponent,
    RaceLapContainerComponent,
    RaceLapToolbarComponent,
    RaceSelectorComponent,
    RaceStatusbarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    RaceDomainModule.forFeature(),
    RouterModule,
    SharedMaterialModule,
  ]
})
export class RaceSharedModule {}
