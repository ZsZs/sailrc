import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './integration/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
  ]
})
export class SharedAuthenticationDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedAuthenticationDomainModule,
      providers: [AuthService]
    }
  }
}
