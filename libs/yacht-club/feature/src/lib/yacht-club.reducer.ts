import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';

import { YachtClub } from '@sailrc/yacht-club/domain';
import { validateYachtClubDetailsForm } from './details/yacht-club-details.reducer';

export const FEATURE_NAME = 'yachtClubFeature';

export interface IYachtClubFeatureState {
  yachtClub: IEntityFormState<YachtClub>
}

export const getYachtClubManagementState = createFeatureSelector<IYachtClubFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: YachtClubFeatureFacadeBase } = buildAutoFormFeatureState(
  YachtClub,
  FEATURE_NAME,
  getYachtClubManagementState,
  {
    id: undefined,
    name: ''
  },
  validateYachtClubDetailsForm
);

export const yachtClubFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateYachtClubDetailsForm
);

export const yachtClubFeatureReducer: ActionReducerMap<IYachtClubFeatureState> = {
  yachtClub: yachtClubFormReducer
}

export const getDetailsForm = createSelector( getYachtClubManagementState, ( state: IYachtClubFeatureState ) => state.yachtClub.entityForm );
