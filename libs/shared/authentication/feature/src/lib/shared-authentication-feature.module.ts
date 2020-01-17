import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAuthenticationDomainModule } from '@sailrc/shared/authentication/domain';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedAuthenticationDomainModule
  ]
})
export class SharedAuthenticationFeatureModule {}
