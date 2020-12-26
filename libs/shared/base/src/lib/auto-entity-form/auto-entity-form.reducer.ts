import { camelCase } from './case';
import { FEATURE_AFFINITY } from './auto-entity-form.state';
import { IEntityFormAction } from './auto-entity-form.actions';

export function stateNameFromAction(action: IEntityFormAction): string {
  return camelCase(action.info.modelName);
}

export function featureNameFromAction(action: IEntityFormAction): string {
  return (action.info.modelType as any)[FEATURE_AFFINITY];
}

export function setNewState(featureName: string, stateName: string, state, newState) {
  const nextState = featureName
    ? { ...state, [featureName]: { ...state[featureName], [stateName]: newState } }
    : { ...state, [stateName]: newState };
  return nextState;
}

/*
export function autoEntityFormReducer( reducer: ActionReducer<any>, state, action: EntityFormActions<any>) {
  let stateName: string;
  let featureName: string;
  let entityState: any;

  if ( Object.values( EntityFormActionTypes ).includes( action.type )) {
    stateName = stateNameFromAction(action);
    featureName = featureNameFromAction(action);
    entityState = featureName ? state[featureName][stateName] : state[stateName];
  }

  const myForm = formGroupReducer( entityState.entityForm, action);
  if (myForm !== entityState.entityForm ) {
    entityState = { ...entityState, myForm };
  }

  switch (action.actionType) {
    case EntityFormActionTypes.CreateEntity: {
      const newState = {
        ...entityState,
        isSaving: true
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
    case EntityFormActionTypes.EditEntity: {
      let formState = setValue<TModel>( INITIAL_FORM_VALUE, { ...action. });
      formState = updateGroup(formState, { id: disable });
      formState = validateRaceDetailsForm( formState );

      const newState = {
        ...entityState,
        isSaving: false
      };

      const next = setNewState(featureName, stateName, state, newState);
      return next;
    }
  }

  return reducer(state, action);
}

/**
 * Provides standard reducer functions to support entity store structure
 *
 * @param reducer
 */
/*
export function autoEntityMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: EntityFormActions<any>) => {
    return autoEntityFormReducer(reducer, state, action);
  };
}
*/
