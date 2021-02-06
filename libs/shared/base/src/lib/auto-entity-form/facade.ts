import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { IEntityFacade, IEntityInfo } from '@briebug/ngrx-auto-entity';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  entityFacade: IEntityFacade<TModel>;
  formState$: Observable<FormGroupState<TModel>>;
  info: IEntityInfo;
  returnTo$: Observable<string>;

  edit(entity: Partial<TModel>): void;
  navigateBack( defaultUrl?: string ): void;
  navigateToList( listPath: string, returnTo?: string ): void;
  navigateToDetails( detailsFormPath: string, returnTo?: string ): void;
}

