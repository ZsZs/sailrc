import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';

import { Boat } from '@sailrc/boat/domain';
import { validateBoatDetailsForm } from './details/boat-details.reducer';
import { INITIAL_BOAT_VALUE } from '@sailrc/boat/domain';

export const FEATURE_NAME = 'boatFeature';

export interface IBoatFeatureState {
  boat: IEntityFormState<Boat>
}

export const getBoatManagementState = createFeatureSelector<IBoatFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: BoatFeatureFacadeBase } = buildAutoFormFeatureState(
  Boat,
  FEATURE_NAME,
  getBoatManagementState,
  INITIAL_BOAT_VALUE,
  validateBoatDetailsForm
);

export const boatFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateBoatDetailsForm
);

export const BOAT_FEATURE_SELECTORS = selectors;

export const boatFeatureReducer: ActionReducerMap<IBoatFeatureState> = {
  boat: boatFormReducer
}

export const getDetailsForm = createSelector( getBoatManagementState, ( state: IBoatFeatureState ) => state.boat.entityForm );
