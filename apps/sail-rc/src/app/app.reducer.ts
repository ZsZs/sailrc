import { ActionReducer, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';

export function consoleLogReducer( reducer: ActionReducer<any>): ActionReducer<any> {
   return function( state, action) {
      console.log( 'state', state) ;
      console.log( 'action', action );
      return reducer(state, action);
   };
}

// export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze, consoleLogReducer] : [];
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
