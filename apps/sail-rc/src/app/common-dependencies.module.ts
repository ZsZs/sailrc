import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedMaterialModule } from '@sailrc/shared/material';

@NgModule({
   declarations: [
   ],
   imports: [
      SharedMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      NgrxFormsModule,
      ReactiveFormsModule
   ],
   exports: [
      SharedMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      NgrxFormsModule,
      ReactiveFormsModule
   ],
   providers: [
   ]
})
export class CommonDependenciesModule {}
