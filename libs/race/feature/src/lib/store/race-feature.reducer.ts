import { buildAutoFormFeatureState, IEntityFormState } from '@processpuzzle/shared/base';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { INITIAL_RACE_VALUE, Race } from '@sailrc/race/domain';
import { validateRaceDetailsForm } from '../details/race-details.reducer';

export const FEATURE_NAME = 'raceFeature';

export interface IRaceFeatureState {
  race: IEntityFormState<Race>
}

export const getRaceManagementState = createFeatureSelector<IRaceFeatureState>( FEATURE_NAME );

export const { initialFormState, selectors, rawReducer, formFacade: RaceFeatureFacadeBase } = buildAutoFormFeatureState(
  Race,
  FEATURE_NAME,
  getRaceManagementState,
  INITIAL_RACE_VALUE,
  validateRaceDetailsForm
);

export const raceFormReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.entityForm,
  validateRaceDetailsForm
);

export const raceFeatureReducer: ActionReducerMap<IRaceFeatureState> = {
  race: raceFormReducer
}

export const getDetailsForm = createSelector( getRaceManagementState, ( state: IRaceFeatureState ) => state.race.entityForm );
