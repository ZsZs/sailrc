import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as fromAppReducer from '../../app.reducer';
import { ComponentDestroyService } from '../component-destroy.service';
import { select, Store } from '@ngrx/store';
import { tabIsActive, tabIsInActive } from '../ui/ui.actions';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import { AppState } from '../../app.reducer';

export abstract class BaseFormComponent<T> implements AfterViewInit, OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  formState$: Observable<FormGroupState<T>>;
  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) { return null; }

      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };

  constructor(
    protected router: Router,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<AppState>,
    protected tabName: string,
    protected formStateSelector: any ) {
    this.selectFormState();
  }

  // public accessors and mutators

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyService.unsubscribeComponent$.next();
    this.store.dispatch( tabIsInActive( { tabName: this.tabName }));
  }

  public ngOnInit() {
    this.subscribeToLoading();
    this.store.dispatch( tabIsActive( { tabName: this.tabName }));
  }

  public abstract onCancel();
  public abstract onSubmit();

  // protected, private helper methods
  private selectFormState() {
    this.formState$ = this.store.pipe( select(this.formStateSelector ));
  }

  private subscribeToLoading() {
    this.isLoading$ = this.store.select( fromAppReducer.getIsLoading );
  }
}
