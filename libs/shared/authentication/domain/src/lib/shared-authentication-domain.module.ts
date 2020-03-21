import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './integration/auth.service';

@NgModule({
  imports: [CommonModule]
})
export class SharedAuthenticationDomainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedAuthenticationDomainModule,
      providers: [AuthService]
    }
  }
}
