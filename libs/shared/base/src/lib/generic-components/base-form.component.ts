import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseUrlSegments, RouterFacade } from '@processpuzzle/shared/util';
import { IEntityFormFacade } from '../..';
import { ActivatedRoute } from '@angular/router';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';

@Component({template: ''})
export abstract class BaseFormComponent<T extends BaseEntityInterface> implements OnDestroy, OnInit {
  formState$: Observable<FormGroupState<T>>;
  isLoading$: Observable<boolean>;
  submittedValue$: Observable<T | undefined>;
  protected defaultCriteria: string;
  protected entityFacade: IEntityFacade<T>;
  protected entityId: string;
  protected readonly onDestroy$ = new Subject<void>();
  protected readonly tabName: string
  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) { return null; }

      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };

  protected constructor(
    @Inject('entityFormFacade') protected entityFormFacade: IEntityFormFacade<T>,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService
  ) {
    this.entityFacade = this.entityFormFacade.entityFacade;
    this.submittedValue$ = this.entityFacade.current$;
    this.selectFormState();
    this.tabName = this.entityFormFacade.info.modelName + '-details';
  }

  // public accessors and mutators

  // life cycle hooks, event handling
  ngOnDestroy(): void {
    this.componentDestroyService.unsubscribeComponent$.next();
    this.activeTabService.tabIsInActive( this.tabName );
    this.onDestroy$.next();
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
    const currentUrl = this.route.snapshot['_routerState'].url;
    const goToUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')).substring(0, currentUrl.lastIndexOf('/'));
    this.entityFormFacade.navigateBack( goToUrl );
  }

  private determineEntityIdFromRoute(): void {
    this.entityId = this.route.snapshot.paramMap.get( this.entityFormFacade.info.modelName + 'Id' );
  }

  private notifyActiveTab() {
    this.activeTabService.tabIsActive( this.tabName );
  }

  protected selectFormState() {
    this.formState$ = this.entityFormFacade.formState$;
  }

  private setCurrentEntity() {
    this.entityFacade.selectByKey( this.entityId );
  }

  protected subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
