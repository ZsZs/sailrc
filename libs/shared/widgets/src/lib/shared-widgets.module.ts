import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarService } from './services/snack-bar.service';
import { VarDirective } from './directive/var.directive';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { uiReducer, UiState } from './store/ui.reducer';

export const UI_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<UiState>>('ui reducer');

@NgModule({
  declarations: [VarDirective],
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', UI_REDUCER_TOKEN )
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
