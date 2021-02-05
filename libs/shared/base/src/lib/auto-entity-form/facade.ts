import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { UrlSegment } from '@angular/router';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  returnTo$: Observable<string>;
  formState$: Observable<FormGroupState<TModel>>;

  edit(entity: Partial<TModel>): void;
  navigateBack( defaultUrl?: string ): void;
  navigateToList( listPath: string, returnTo?: string ): void;
  navigateToDetails( detailsFormPath: string, returnTo?: string ): void;
}

