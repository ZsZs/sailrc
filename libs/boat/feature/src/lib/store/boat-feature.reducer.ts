import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { buildAutoFormFeatureState, IEntityFormState } from '@sailrc/shared/base';
import { BoatClass } from '@sailrc/boat/domain';
import { validateBoatClassDetailsForm } from '../details/boat-class-details.reducer';

export const FEATURE_NAME = 'boatFeature';

export interface IBoatFeatureState {
  boatClass: IEntityFormState<BoatClass>
}

export const getBoatClassManagementState = createFeatureSelector<IBoatFeatureState>( FEATURE_NAME );

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

export const boatFeatureReducer: ActionReducerMap<IBoatFeatureState> = {
  boatClass: boatClassFormReducer
}

export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: IBoatFeatureState ) => state.boatClass.entityForm );
