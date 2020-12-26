import { createFormGroupState, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { Action, ActionReducer, Store } from '@ngrx/store';
import { camelCase } from './case';
import { EntityFormAction, EntityFormActionTypes } from './auto-entity-form.actions';
import { Observable } from 'rxjs';
import { Edit } from '@briebug/ngrx-auto-entity';

export const ENTITY_OPTS_PROP = '__nae_entity_form_opts';
export const FEATURE_AFFINITY = '__ngrxae_feature_affinity';

/**
 * The basic structure of a class for an entity
 */
export type IEntityClass<TEntity> = new () => TEntity;

/**
 * Structure for how forms are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityFormState<TEntity> {
  entityForm: FormGroupState<TEntity>;
}

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  entityForm$: Observable<FormGroupState<TModel>>;
  delete(): void;
  edit(entity: Partial<TModel>): void;
  update(): void;
  save(): void;
}


/**
 * Structure of the model state built by the buildState() function
 */
export interface IFormModelState<TEntity> {
  initialFormState: IEntityFormState<TEntity>,
  rawReducer: ActionReducer<IEntityFormState<TEntity>, Action>,
  formFacade: IEntityFormFacade<TEntity>
}

export class FormModelStateFactory<TEntity> {
  private readonly INITIAL_FORM_VALUE: FormGroupState<TEntity>;
  private readonly instance;
  private readonly modelName: string;
  private readonly opts;
  private formFacade: IEntityFormFacade<TEntity>;
  private initialState: IEntityFormState<TEntity>;
  private rawReducer: ActionReducer<IEntityFormState<TEntity>, Action>;

  public constructor(private type: IEntityClass<TEntity>, private initialFormValue: TEntity, private featureName: string) {
    this.instance = new type();
    this.opts = type[ENTITY_OPTS_PROP] || { modelName: this.instance.constructor.name };
    this.modelName = camelCase( this.opts.modelName);
    console.log( `NGRX-AE: Building entity feature state for: ${type.name}; constructor name: ${this.instance.constructor.name}` );
    this.INITIAL_FORM_VALUE = createFormGroupState<TEntity>( this.modelName + 'Form', initialFormValue );
  }

  public buildFeatureFormState( ): IFormModelState<TEntity> {
    this.createInitialFormState();
    this.createRawReducer();
    this.createFormFacade();

    return {
      initialFormState: this.initialState,
      rawReducer: this.rawReducer,
      formFacade: this.formFacade
    };
  }

  // protected, private helper methods
  /**
   * Builds a new facade class for the specified entity model.
   */
  private createFormFacade() {
    const buildFacade = <TModel>() => {
      return class Facade implements IEntityFormFacade<TModel> {
        entityForm$: Observable<FormGroupState<TModel>>;
        modelType: new () => TModel;
        store: Store<any>;

        constructor( modelType: new () => TModel, store: Store<any> ) {
          this.modelType = modelType;
          this.store = store;
        }

        edit( entity: Partial<TModel> ): void {
          this.store.dispatch( new Edit( this.modelType, entity ) );
        }

        delete(): void {
        }

        save(): void {
        }

        update(): void {
        }
      };
    };

  }

  private createInitialFormState() {
    this.initialState = {
      entityForm: this.INITIAL_FORM_VALUE
    } as IEntityFormState<TEntity>;
  }

  private createRawReducer() {
    this.rawReducer = (state = this.initialState, action: EntityFormAction<TEntity> ) : IEntityFormState<TEntity> => {
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
