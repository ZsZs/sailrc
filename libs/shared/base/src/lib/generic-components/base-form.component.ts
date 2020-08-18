import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import { Store } from '@ngrx/store';

import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { BaseUrlSegments } from '../generic-components/base-url-segments';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { RouterFacade } from '@sailrc/shared/util';
import { BaseEntityFacade } from '../..';

export abstract class BaseFormComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  formState$: Observable<FormGroupState<T>>;
  submittedValue$: Observable<T | undefined>;
  private entityId: string;
  private entityName: string;
  private pathVariableName: string;
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
    protected entityFacade: BaseEntityFacade<T>,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<any>,
    protected formStateSelector: any,
    protected tabName: string )
  {
    this.submittedValue$ = entityFacade.current$;
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
    this.determineEntityIdFromRoute();
    this.subscribeToLoading();
    this.notifyActiveTab();
    this.setCurrentEntity();
  }

  onCancel() {
    this.entityFacade.deselect();
    this.routerFacade.routerGo(  ['../../'], {}, { relativeTo: this.route } )
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.entityFacade.deselect() ),
      map( formState => formState.value ),
      map(entity => this.entityId === BaseUrlSegments.NewEntity ? this.entityFacade.create( entity ) : this.entityFacade.update( entity )),
      tap( () => this.routerFacade.routerGo( ['../../'], {}, { relativeTo: this.route } ))
    ).subscribe();
  }

  // protected, private helper methods
  private determineEntityIdFromRoute(): void {
    this.entityId = this.route.snapshot.paramMap.get( this.entityFacade.entityIdPathVariable );
  }

  private notifyActiveTab() {
    this.activeTabService.tabIsActive( this.tabName );
  }

  protected selectFormState() {
    this.formState$ = this.store.select( this.formStateSelector );
  }

  private setCurrentEntity() {
    this.entityFacade.selectByKey( this.entityId );
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
