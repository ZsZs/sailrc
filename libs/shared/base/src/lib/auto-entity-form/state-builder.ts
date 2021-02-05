import { createSelector, MemoizedSelector } from '@ngrx/store';
import { createFormGroupState, formGroupReducer, FormGroupState, setValue } from 'ngrx-forms';
import { ENTITY_OPTS_PROP, IEntityOptions } from '@briebug/ngrx-auto-entity';

import { IEntityFormState } from './form-state';
import { IFormModelState, IModelClass } from './model.state';
import { camelCase } from './case';
import { buildSelectorMap } from './selector-map-builder';
import { buildFacade } from './facade-builder';
import { EditEntity, EntityFormAction, EntityFormActionTypes, NavigateToDetails, NavigateToList } from './actions';
import { FormValidatorFunction } from './form-state';

export const FEATURE_AFFINITY = '__ngrxae_feature_form_affinity';

/**
 * Builds the Ngrx state for an entity that is part of a feature module
 *
 * @param type the entity class
 * @param featureStateName the name of the feature state
 * @param selectParentState a selector for the entity's parent state
 * @param extraInitialState the (optional) initial feature state
 */
export const buildAutoFormFeatureState = <TState extends IEntityFormState<TModel>, TParentState extends any, TModel, TExtra>(
  type: IModelClass<TModel>,
  featureStateName: NonNullable<string>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  selectParentState: MemoizedSelector<object, TParentState>,
  initialFormValue: TModel,
  formValidator: FormValidatorFunction<TModel>,
  extraInitialState?: TExtra
): IFormModelState<TParentState, TState, TModel, TExtra> => {
  const opts = type[ENTITY_OPTS_PROP];
  ensureModelName(opts);
  const stateName = entityStateName(opts.modelName);
  (type as any)[FEATURE_AFFINITY] = featureStateName;

  const selectState = createSelector(
    selectParentState,
    (state: TParentState) => {
      if (!state) {
        const message = `Could not retrieve feature state ${featureStateName} for model ${opts.modelName}! Make sure you add your entity state to the feature state with a property named exactly '${stateName}'.`;
        const example = ` Example app state:

export interface FeatureState {
  // ... other states ...
  ${stateName}: IEntityState<${opts.modelName}>,
  // ... other states ...
}`;
        console.error('[NGRX-AE] ! ' + message + example);
        throw new Error(message);
      }
      const modelState = state[stateName];
      if (!modelState) {
        const message = `State for model ${opts.modelName} in feature ${featureStateName} could not be found!`;
        console.error('[NGRX-AE] ! ' + message);
        throw new Error(message);
      }
      return modelState;
    }
  );

  const initialFormState = {
    entityForm: createFormGroupState<TModel>( opts.modelName + 'Form', initialFormValue ),
    returnTo: '',
    ...extraInitialState
  } as TState & TExtra;

  const selectors = buildSelectorMap<TParentState, TState, TModel, TExtra>(selectState);
  const formFacade = buildFacade<TModel, TParentState>(selectors);
  const rawReducer = (state = initialFormState, action: EntityFormAction<TModel>): IEntityFormState<TModel> & TExtra => {
      let entityForm = formGroupReducer( state.entityForm, action );
      if ( entityForm !== state.entityForm ) {
        state = { ...state, entityForm: entityForm };
      }

      switch( action.actionType ) {
        case EntityFormActionTypes.CreateEntity:
          entityForm = setValue<TModel>( state.entityForm, initialFormValue ) as FormGroupState<TModel>;
          entityForm = formValidator( entityForm );
          return { ...state, entityForm: entityForm };

        case EntityFormActionTypes.EditEntity:
          entityForm = setValue<TModel>( state.entityForm, {...(<EditEntity<TModel>>action).entity }) as FormGroupState<TModel>;
          entityForm = formValidator( entityForm );
          return { ...state, entityForm: entityForm };

        case EntityFormActionTypes.NavigateBack:
          return { ...state, returnTo: '' };

        case EntityFormActionTypes.NavigateToDetails:
          return { ...state, returnTo: (<NavigateToDetails<TModel>>action).returnTo };

        case EntityFormActionTypes.NavigateToList:
          return {  ...state, returnTo: (<NavigateToList<TModel>>action).returnTo };

        default: {
          return state;
        }
    }

    return state;
  };

  return {
    initialFormState,
    selectors,
    rawReducer,
    formFacade
  };
};

export const NO_MODEL_NAME_MSG =
  'Specified model is decorated with @Entity but does not specify a modelName, which is required for proper production execution. Building of state aborted!';
const ensureModelName = (opts: IEntityOptions) => {
  if (!opts.modelName) {
    const example = ` Example model with proper decoration:

@Entity({modelName: 'Test'})
export class Test {
  @Key yourKey: number | string;
  // ... other properties ...
}`;
    console.error('[NGRX-AE] ! ' + NO_MODEL_NAME_MSG + example);
    throw new Error(NO_MODEL_NAME_MSG);
  }
};

export const entityStateName = (modelName: string): string => camelCase(modelName);
