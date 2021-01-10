import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { buildAutoFormFeatureState, IEntityFormState } from '@sailrc/shared/base';
import { BoatClass } from '@sailrc/boat/domain';
import { validateBoatClassDetailsForm } from '../details/boat-class-details.reducer';

export const FEATURE_NAME = 'boatFeature';

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

export interface IBoatFeatureState {
  detailsForm: IEntityFormState<BoatClass>
}

const INITIAL_BOAT_FEATURE_STATE : IBoatFeatureState = {
  detailsForm : initialFormState
}

export const BOAT_CLASS_FEATURE_SELECTORS = selectors;

function boatFeatureState( state = INITIAL_BOAT_FEATURE_STATE ): IBoatFeatureState {
  return state;
}

export const boatFeatureReducer: ActionReducerMap<IBoatFeatureState> = {
  detailsForm: boatClassFormReducer
}

export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: IBoatFeatureState ) => state.detailsForm.entityForm );
