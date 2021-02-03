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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const UI_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<UiState>>('ui reducer');

@NgModule({
  declarations: [
    CameraUploadComponent,
    VarDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    MatCardModule,
    SharedMaterialModule,
    StoreModule.forFeature( 'ui', UI_REDUCER_TOKEN ),
    WebcamModule,
    MatDialogModule,
    FlexModule
  ],
  providers: [
    { provide: UI_REDUCER_TOKEN, useValue: uiReducer }
  ]
})
export class SharedWidgetsModule {
  static forRoot(): ModuleWithProviders<SharedWidgetsModule> {
    return {
      ngModule: SharedWidgetsModule,
      providers: [SnackBarService]
    }
  }

}
