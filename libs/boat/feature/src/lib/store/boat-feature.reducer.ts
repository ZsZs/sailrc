import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { BaseFormStateFactory, IEntityFormState } from '@sailrc/shared/base';
import { BoatClass } from '@sailrc/boat/domain';
import { validateBoatClassDetailsForm } from '../details/boat-class-details.reducer';

export const FEATURE_NAME = 'boatFeature';
const factory = new BaseFormStateFactory(
  BoatClass,
  {
    id: undefined,
    name: '',
    yardstick: undefined
  },
  FEATURE_NAME
);
const featureSelector = createFeatureSelector<IBoatFeatureState>( FEATURE_NAME );
const { initialState, rawReducer } = factory.buildFeatureFormState();

export const boatClassFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateBoatClassDetailsForm
);

export interface IBoatFeatureState {
  detailsForm: IEntityFormState<BoatClass>
}

const INITIAL_BOAT_FEATURE_STATE : IBoatFeatureState = {
  detailsForm : initialState
}

function boatFeatureState( state = INITIAL_BOAT_FEATURE_STATE ): IBoatFeatureState {
  return state;
}

export const boatFeatureReducer: ActionReducerMap<IBoatFeatureState> = {
  detailsForm: boatClassFormReducer
}

export const getBoatClassManagementState = createFeatureSelector<IBoatFeatureState>( FEATURE_NAME );
export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: IBoatFeatureState ) => state.detailsForm.entityForm );
