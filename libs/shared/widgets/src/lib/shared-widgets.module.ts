import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarService } from './services/snack-bar.service';

@NgModule({
  imports: [CommonModule]
})
export class SharedWidgetsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedWidgetsModule,
      providers: [SnackBarService]
    }
  }

}
