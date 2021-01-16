import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';
import { BoatClass } from '@sailrc/boat-class/domain';
import { validateBoatClassDetailsForm } from '../details/boat-class-details.reducer';

export const FEATURE_NAME = 'boatClassFeature';

export interface IBoatClassFeatureState {
  boatClass: IEntityFormState<BoatClass>
}

export const getBoatClassManagementState = createFeatureSelector<IBoatClassFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: BoatClassFeatureFacadeBase } = buildAutoFormFeatureState(
  BoatClass,
  FEATURE_NAME,
  getBoatClassManagementState,
  {
    id: undefined,
    name: '',
    yardstick: undefined
  },
  validateBoatClassDetailsForm
);

export const boatClassFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateBoatClassDetailsForm
);

export const BOAT_CLASS_FEATURE_SELECTORS = selectors;

export const boatClassFeatureReducer: ActionReducerMap<IBoatClassFeatureState> = {
  boatClass: boatClassFormReducer
}

export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: IBoatClassFeatureState ) => state.boatClass.entityForm );
