import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';

import { IEntityFormFacade } from './facade';
import { ISelectorMap } from './selector-map';
import { EditEntity, NavigateBack, NavigateToDetails, NavigateToList } from './actions';
import { forwardRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';

let selectorsVariable: ISelectorMap<any, any>;

/**
 * Builds a new facade class for the specified entity model and parent state.
 * @param selectors - the selector map for the specified entity
 */
export const buildFacade = <TModel, TParentState>(selectors: ISelectorMap<TParentState, TModel>) => {
  selectorsVariable = selectors;
  return BaseFormFacade;
};

@Injectable({providedIn: "root", useClass: forwardRef( () => DefaultFormFacade )})
export abstract class BaseFormFacade<TModel> implements IEntityFormFacade<TModel> {
  modelType: new () => TModel;
  private selectors = selectorsVariable;

  constructor( modelType: new () => TModel, protected store: Store<any>, protected router: Router ) {
    this.modelType = modelType;
    this.store = store;
  }

  // region public accessor and mutators
  public currentUrl() {
    return this.router.url;
  }

  public edit( entity: Partial<TModel> ): void {
    this.store.dispatch( new EditEntity( this.modelType, entity ) );
  }

  public navigateBack( defaultUrl?: string ): void {
    this.returnTo$.pipe(
      first()).subscribe(
      returnTo => {
        let goTo: string;
        if( returnTo ) goTo = returnTo;
        else goTo = defaultUrl;
        this.store.dispatch( new NavigateBack( this.modelType ) );
        this.router.navigateByUrl( goTo );
      }
    );
  }

  public navigateToList( listPath: string, returnTo?: string ): void {
    if( !returnTo ) { returnTo = this.router.url; }
    this.store.dispatch( new NavigateToList( this.modelType, returnTo ));
    this.router.navigateByUrl( listPath );
  }

  public navigateToDetails( detailsFormPath: string, returnTo?: string ): void {
    if( !returnTo ) { returnTo = this.router.url; }
    this.store.dispatch( new NavigateToDetails( this.modelType, returnTo ));
    this.router.navigateByUrl( detailsFormPath );
  }
  // endregion

  // region properties
  get formState$(): Observable<FormGroupState<TModel>>{
    return this.store.select( this.selectors.selectEntityForm );
  }

  get returnTo$(): Observable<string> {
    return this.store.select( this.selectors.selectReturnTo );
  }

  // endregion

  // region protected, private helper methods
  // endregion
}

class DefaultFormFacade<TModel> extends BaseFormFacade<TModel>{}
