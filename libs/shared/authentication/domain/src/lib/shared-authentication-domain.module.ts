import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './infrastructure/auth.service';

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
