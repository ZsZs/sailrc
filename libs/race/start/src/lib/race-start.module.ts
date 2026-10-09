import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RaceStartComponent } from './race-start.component';
import { RaceStartTabsComponent } from './race-start-tabs/race-start-tabs.component';
import { RaceStartPreparationComponent } from './race-start-preparation/race-start-preparation.component';
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
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { RaceStartSignsComponent } from './race-start-signs/race-start-signs.component';
import { StartTimePickerComponent } from './race-start-time-selector/start-time-picker.component';
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
  declarations: [RaceStartComponent, RaceStartTabsComponent, RaceStartPreparationComponent, RaceStartCaptureComponent, RaceStartSignsComponent, StartTimePickerComponent],
  imports: [
    CommonModule,
    FlexModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    NgOptimizedImage,
    NgxMatTimepickerModule,
    NgrxFormsModule,
    RaceDomainModule.forFeature(),
    RaceStartRoutingModule,
    RaceSharedModule,
    SharedBaseModule,
    SharedMaterialModule,
    SharedWidgetsModule,
  ],
  providers: [LapResolver, RaceResolver, RaceStartFeatureFacade],
  exports: [RaceStartSignsComponent, StartTimePickerComponent],
})
export class RaceStartModule {}
