import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceStartComponent } from './race-start.component';
import { RaceStartTabsComponent } from './race-start-tabs/race-start-tabs.component';
import { RaceStartTimerComponent } from './race-start-timer/race-start-timer.component';
import { RaceStartCaptureComponent } from './race-start-capture/race-start-capture.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RaceDomainModule } from '@sailrc/race/domain';
import { LapResolver, RaceSharedModule } from '@sailrc/race/shared';
import { SharedBaseModule } from '@processpuzzle/shared/base';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { SharedWidgetsModule } from '@processpuzzle/shared/widgets';
import { FlexModule } from '@angular/flex-layout';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormsModule } from '@angular/forms';
import { RaceResolver } from '@sailrc/race/feature';
import { RaceStartFeatureFacade } from './race-start-feature.facade';
import { RaceStartRoutingModule } from './race-start-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [RaceStartComponent, RaceStartTabsComponent, RaceStartTimerComponent, RaceStartCaptureComponent],
  imports: [
    CommonModule,
    CountdownModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    RaceDomainModule.forFeature(),
    RaceStartRoutingModule,
    RaceSharedModule,
    SharedBaseModule,
    SharedMaterialModule,
    SharedWidgetsModule,
    FlexModule,
    NgrxFormsModule,
    FormsModule
  ],
  providers: [
    LapResolver,
    RaceResolver,
    RaceStartFeatureFacade
  ],
  exports: []
})
export class RaceStartModule {}
