import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedAuthenticationDomainModule } from '@processpuzzle/authentication/domain';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from '@processpuzzle/shared/material';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedAuthenticationDomainModule,
    SharedMaterialModule
  ]
})
export class SharedAuthenticationFeatureModule {}
