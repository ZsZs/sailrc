import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarService } from './services/snack-bar.service';
import { VarDirective } from './directive/var.directive';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { uiReducer, UiState } from '@processpuzzle/shared/base';
import { CameraUploadComponent } from './camera-upload/camera-upload.component';
import { MatCardModule } from '@angular/material/card';
import { WebcamModule } from 'ngx-webcam';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapSelectComponent } from './map-select/map-select.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapSelectViewAdapter } from './map-select/map-select-view-adapter';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GOOGLE_API_KEY_TOKEN } from './services/google-maps-service';
import { CountdownFormFieldComponent } from './countdown-form-field/countdown-form-field.component';
import { CountdownModule } from 'ngx-countdown';
import { TimepickerFormFieldComponent } from './timepicker-form-field/timepicker-form-field.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CountupFormFieldComponent } from './countup-form-field/countup-form-field.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageUploadViewAdapter } from './image-upload/image-upload-view-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

export const UI_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<UiState>>('ui reducer');

@NgModule({
  declarations: [
    CameraUploadComponent,
    CountdownFormFieldComponent,
    CountupFormFieldComponent,
    ImageUploadComponent,
    ImageUploadViewAdapter,
    MapSelectComponent,
    MapSelectViewAdapter,
    TimepickerFormFieldComponent,
    VarDirective,
  ],
  exports: [CountdownFormFieldComponent, CountupFormFieldComponent, ImageUploadComponent, ImageUploadViewAdapter, MapSelectComponent, MapSelectViewAdapter, TimepickerFormFieldComponent],
  imports: [
    CdTimerModule,
    CountdownModule,
    CommonModule,
    DragDropModule,
    FlexModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxMatTimepickerModule,
    SharedMaterialModule,
    StoreModule.forFeature('ui', UI_REDUCER_TOKEN),
    ReactiveFormsModule,
    WebcamModule,
  ],
  providers: [{ provide: UI_REDUCER_TOKEN, useValue: uiReducer }],
})
export class SharedWidgetsModule {
  static forFeature(googleApiKey: string): ModuleWithProviders<SharedWidgetsModule> {
    return {
      ngModule: SharedWidgetsModule,
      providers: [{ provide: GOOGLE_API_KEY_TOKEN, useValue: googleApiKey }, SnackBarService],
    };
  }
}
