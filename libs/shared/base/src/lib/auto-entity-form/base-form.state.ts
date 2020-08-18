import { createFormGroupState, disable, formGroupReducer, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup } from 'ngrx-forms';
import { IModelClass, ISelectorMap } from '@briebug/ngrx-auto-entity';
import { Action, ActionReducer, createReducer, MemoizedSelector, on } from '@ngrx/store';
import { camelCase } from './case';
import { EntityFormAction, EntityFormActions, EntityFormActionTypes } from './base-form.actions';

export const ENTITY_OPTS_PROP = '__nae_entity_form_opts';

/**
 * Structure for how forms are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityFormState<TModel> {
  entityForm: FormGroupState<TModel>;
}

/**
 * Structure of the model state built by the buildState() function
 */
export interface IBaseFormState<TModel> {
  initialState: IEntityFormState<TModel>,
  rawReducer: ActionReducer<IEntityFormState<TModel>, Action>
}

export class BaseFormStateFactory<TModel> {
  private readonly INITIAL_FORM_VALUE: FormGroupState<TModel>;
  private readonly instance;
  private readonly modelName: string;
  private readonly opts;
  private initialState: IEntityFormState<TModel>;
  private rawReducer: ActionReducer<IEntityFormState<TModel>, Action>;

  public constructor( private type: IModelClass<TModel>, private initialFormValue: TModel, private featureName: string) {
    this.instance = new type();
    this.opts = type[ENTITY_OPTS_PROP] || { modelName: this.instance.constructor.name };
    this.modelName = camelCase( this.opts.modelName);

    console.log( `NGRX-AE: Building entity feature state for: ${type.name}; constructor name: ${this.instance.constructor.name}` );

    this.INITIAL_FORM_VALUE = createFormGroupState<TModel>( this.modelName + 'Form', initialFormValue );
  }

  public buildFeatureFormState( ): IBaseFormState<TModel> {
    this.createInitialState();
    this.createReducer();
    return {
      initialState: this.initialState,
      rawReducer: this.rawReducer
    };

  }

  // protected, private helper methods
  private createInitialState() {
    this.initialState = {
      entityForm: this.INITIAL_FORM_VALUE
    } as IEntityFormState<TModel>;
  }

  private createReducer() {
    this.rawReducer = (state = this.initialState, action: EntityFormAction<TModel> ) : IEntityFormState<TModel> => {
      const myForm = formGroupReducer( state.entityForm, action );
      if ( myForm !== state.entityForm ) {
        state = { ...state, entityForm: myForm };
      }

      switch( action.actionType ) {
        case EntityFormActionTypes.CreateEntity:
          return state;

        case EntityFormActionTypes.EditEntity:
//          let formState = setValue<IEntityFormState<TModel>>( this.INITIAL_FORM_VALUE );
//          formState = updateGroup( formState, { id: disable } );
          return state;

        default: {
          return state;
        }
      }
    }
  }
}
