import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarService } from './services/snack-bar.service';
import { VarDirective } from './directive/var.directive';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { uiReducer, UiState } from './store/ui.reducer';
import { CameraUploadComponent } from './camera-upload/camera-upload.component';
import { MatCardModule } from '@angular/material/card';
import { WebcamModule } from 'ngx-webcam';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GOOGLE_API_KEY_TOKEN, MapSelectComponent } from './map-select/map-select.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapSelectViewAdapter } from './map-select/map-select-view-adapter';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../apps/sail-rc/src/environments/environment';

export const UI_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<UiState>>('ui reducer');

@NgModule({
  declarations: [
    CameraUploadComponent,
    MapSelectComponent,
    MapSelectViewAdapter,
    VarDirective
  ],
  exports: [
    MapSelectComponent,
    MapSelectViewAdapter,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    SharedMaterialModule,
    StoreModule.forFeature( 'ui', UI_REDUCER_TOKEN ),
    WebcamModule,
    MatDialogModule,
    FlexModule,
  ],
  providers: [
    { provide: UI_REDUCER_TOKEN, useValue: uiReducer }
  ]
})
export class SharedWidgetsModule {
  static forRoot( googleApiKey: string ): ModuleWithProviders<SharedWidgetsModule> {
    return {
      ngModule: SharedWidgetsModule,
      providers: [
        { provide: GOOGLE_API_KEY_TOKEN, useValue: googleApiKey },
        SnackBarService
      ]
    }
  }

}
