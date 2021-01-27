import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseUrlSegments, RouterFacade } from '@processpuzzle/shared/util';
import { BaseEntityFacade, IEntityFormFacade } from '../..';
import { ActivatedRoute } from '@angular/router';

@Component({template: ''})
export abstract class BaseFormComponent<T extends BaseEntityInterface> implements OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  formState$: Observable<FormGroupState<T>>;
  submittedValue$: Observable<T | undefined>;
  protected defaultCriteria: string;
  private entityId: string;
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
    @Inject('entityFacade') protected entityFacade: BaseEntityFacade<T>,
    @Inject('entityFormFacade') protected entityFormFacade: IEntityFormFacade<T>,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    @Inject(String) protected tabName: string )
  {
    this.submittedValue$ = entityFacade.current$;
    this.selectFormState();
  }

  // public accessors and mutators

  // life cycle hooks, event handling
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
    this.closeFormAndNavigateBack();
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.entityFacade.deselect() ),
      map( formState => formState.value ),
      map(entity => {
        this.entityId === BaseUrlSegments.NewEntity ?
          this.entityFacade.create( entity, this.defaultCriteria ) :
          this.entityFacade.update( entity, this.defaultCriteria )
      }),
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

  private notifyActiveTab() {
    this.activeTabService.tabIsActive( this.tabName );
  }

  protected selectFormState() {
    this.formState$ = this.entityFormFacade.getFormState();
  }

  private setCurrentEntity() {
    this.entityFacade.selectByKey( this.entityId );
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
