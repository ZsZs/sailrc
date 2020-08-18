import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router/router.effects';
import { RouteStateService } from './router/route-state.service';
import { RouterFacade } from './router/router.facade';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([RouterEffects])
  ]
})
export class SharedUtilModule {
  static forRoot(): ModuleWithProviders<SharedUtilModule> {
    return {
      ngModule: SharedUtilModule,
      providers: [RouterFacade, RouteStateService]
    }
  }
}
