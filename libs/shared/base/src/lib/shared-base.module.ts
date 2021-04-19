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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BaseListContainerComponent } from './generic-components/base-list-container/base-list-container.component';
import { BaseFormContainerComponent } from './generic-components/base-form-container/base-form-container.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations:[ImageUploadComponent, ImageUploadViewAdapter, BaseListContainerComponent, BaseFormContainerComponent],
  exports: [ImageUploadComponent, ImageUploadViewAdapter, BaseListContainerComponent, BaseFormContainerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    NgrxFormsModule,
    MatButtonModule,
    MatMenuModule,
    FlexModule,
  ]
})
export class SharedBaseModule {}
