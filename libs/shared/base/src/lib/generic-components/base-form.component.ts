import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';

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
    protected entityFacade: IEntityFacade<T>,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected tabName: string ) {
    this.selectFormState();
  }

  // public accessors and mutators

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyService.unsubscribeComponent$.next();
    this.activeTabService.tabIsInActive( this.tabName );
  }

  public ngOnInit() {
    this.subscribeToLoading();
    this.activeTabService.tabIsActive( this.tabName );
  }

  public abstract onCancel();
  public abstract onSubmit();

  // protected, private helper methods
  protected abstract selectFormState();

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
