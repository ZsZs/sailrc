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
import { RaceTimerComponent } from './race-timer/race-timer.component';
import { CountdownModule } from 'ngx-countdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedWidgetsModule } from '@processpuzzle/shared/widgets';

@NgModule({
  declarations: [LapSelectorComponent, RaceLapContainerComponent, RaceLapToolbarComponent, RaceSelectorComponent, RaceStatusbarComponent, RaceTimerComponent],
  exports: [LapSelectorComponent, RaceLapContainerComponent, RaceLapToolbarComponent, RaceSelectorComponent, RaceStatusbarComponent, RaceTimerComponent],
  imports: [CommonModule, CountdownModule, FlexModule, MatFormFieldModule, MatInputModule, RaceDomainModule.forFeature(), RouterModule, SharedMaterialModule, SharedWidgetsModule],
})
export class RaceSharedModule {}
