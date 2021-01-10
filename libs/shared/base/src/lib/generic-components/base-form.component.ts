import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { BaseUrlSegments, RouterFacade } from '@sailrc/shared/util';
import { BaseEntityFacade, IEntityFormFacade } from '../..';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector, Selector } from '@ngrx/store';

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
    protected entityFormFacade: IEntityFormFacade<T>,
    protected entityFormSelector: MemoizedSelector<any, any>,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
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
    this.dispatchEditOrNewEvent();
  }

  onCancel() {
    this.entityFacade.deselect();
    this.closeFormAndNavigateBack();
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.entityFacade.deselect() ),
      map( formState => formState.value ),
      map(entity => this.entityId === BaseUrlSegments.NewEntity ? this.entityFacade.create( entity ) : this.entityFacade.update( entity )),
      tap( () => this.closeFormAndNavigateBack())
    ).subscribe();
  }

  // protected, private helper methods
  private closeFormAndNavigateBack() {
    this.routerFacade.routerGo( ['../../'], {}, { relativeTo: this.route } )
  }

  private determineEntityIdFromRoute(): void {
    this.entityId = this.route.snapshot.paramMap.get( this.entityFacade.entityIdPathVariable );
  }

  private dispatchEditOrNewEvent() {
  }

  private notifyActiveTab() {
    this.activeTabService.tabIsActive( this.tabName );
  }

  protected selectFormState() {
    this.formState$ = this.entityFormFacade.getFormState( this.entityFormSelector );
  }

  private setCurrentEntity() {
    this.entityFacade.selectByKey( this.entityId );
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
