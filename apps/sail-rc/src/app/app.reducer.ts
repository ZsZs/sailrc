import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { BaseRouterStoreState, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { uiReducer, UiState } from '@sailrc/shared/widgets';
import { authReducer, AuthState } from '@sailrc/shared/authentication/domain';

export interface AppState {
   auth: AuthState;
   ui: UiState;
   router: RouterReducerState<BaseRouterStoreState>;
}

export const appReducers: ActionReducerMap<AppState> = {
   auth: authReducer,
   ui: uiReducer,
   router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
