import { Sailor } from '@sailrc/sailor/domain';
import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { validateSailorDetailsForm } from '../details/sailor-details.reducer';

export const FEATURE_NAME = 'sailorFeature';

export interface ISailorFeatureState {
  sailor: IEntityFormState<Sailor>
}

export const getSailorManagementState = createFeatureSelector<ISailorFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: BoatFeatureFacadeBase } = buildAutoFormFeatureState(
  Sailor,
  FEATURE_NAME,
  getSailorManagementState,
  {
    id: undefined,
    firstName: '',
    lastName: '',
    yachtClub: ''
  },
  validateSailorDetailsForm
);

export const sailorFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateSailorDetailsForm
);

export const sailorFeatureReducer: ActionReducerMap<ISailorFeatureState> = {
  sailor: sailorFormReducer
}

export const getDetailsForm = createSelector( getSailorManagementState, ( state: ISailorFeatureState ) => state.sailor.entityForm );
