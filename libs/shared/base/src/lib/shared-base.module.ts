import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgrxFormsModule } from 'ngrx-forms';
import { ImageUploadViewAdapter } from './image-upload/image-upload-view-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations:[ImageUploadComponent, ImageUploadViewAdapter],
  exports: [ImageUploadComponent, ImageUploadViewAdapter],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgrxFormsModule,
    MatButtonModule,
    MatMenuModule,
    FlexModule
  ]
})
export class SharedBaseModule {}
