import { disable, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { BoatClass } from '@sailrc/boat/domain';
import { INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE, validateBoatClassDetailsForm } from '../details/boat-class-details.reducer';
import { editBoatClass } from './boat-class.actions';

export interface BoatFeatureState {
  boatClassDetailsForm: FormGroupState<BoatClass>;
}

export const INITIAL_BOAT_FEATURE_STATE: BoatFeatureState = {
  boatClassDetailsForm: INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE
};

const rawReducer = createReducer(
  INITIAL_BOAT_FEATURE_STATE,
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( editBoatClass, ( state, action ) => {
    let formState = setValue<BoatClass>( INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE, { ...action.boatClass });
    formState = updateGroup(formState, { id: disable });
    formState = validateBoatClassDetailsForm( formState );
    return { ...state, boatClassDetailsForm: formState };
  })
);

export const boatFeatureReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.boatClassDetailsForm,
  validateBoatClassDetailsForm
);

export const getBoatClassManagementState = createFeatureSelector<BoatFeatureState>('boatFeature');
export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: BoatFeatureState ) => state.boatClassDetailsForm );