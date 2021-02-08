import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { INITIAL_SAILING_PLACE_VALUE, SailingPlace } from '@sailrc/sailing-place/domain';
import { validateSailingPlaceDetailsForm } from './details/sailing-place-details.reducer';

export const FEATURE_NAME = 'sailingPlaceFeature';

export interface ISailingPlaceFeatureState {
  sailingPlace: IEntityFormState<SailingPlace>
}

export const getSailingPlaceManagementState = createFeatureSelector<ISailingPlaceFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: SailingPlaceFeatureFacadeBase } = buildAutoFormFeatureState(
  SailingPlace,
  FEATURE_NAME,
  getSailingPlaceManagementState,
  INITIAL_SAILING_PLACE_VALUE,
  validateSailingPlaceDetailsForm
);

export const sailingPlaceFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateSailingPlaceDetailsForm
);

export const SAILING_PLACE_FEATURE_SELECTORS = selectors;

export const sailingPlaceFeatureReducer: ActionReducerMap<ISailingPlaceFeatureState> = {
  sailingPlace: sailingPlaceFormReducer
}

export const getDetailsForm = createSelector( getSailingPlaceManagementState, ( state: ISailingPlaceFeatureState ) => state.sailingPlace.entityForm );
