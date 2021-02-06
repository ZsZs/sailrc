import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { BaseEntityInterface, IEntityFormFacade } from '@processpuzzle/shared/base';
import { BaseUrlSegments } from '@processpuzzle/shared/util';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { ActivatedRoute } from '@angular/router';

@Component({template: ''})
export abstract class BaseTabsComponent<T extends BaseEntityInterface> implements OnDestroy, OnInit {
  currentTab$: Observable<string>;
  selectedEntity$: Observable<T>;
  selectedEntityId: string;
  readonly detailsTabName: string
  readonly listTabName: string
  protected entityFacade: IEntityFacade<T>;
  protected readonly onDestroy$ = new Subject<void>();

  protected constructor(
    @Inject('entityFormFacade') protected entityFormFacade: IEntityFormFacade<T>,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    this.entityFacade = this.entityFormFacade.entityFacade;
    this.detailsTabName = this.entityFormFacade.info.modelName + '-details';
    this.listTabName = this.entityFormFacade.info.modelName + '-list';
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.retrieveActiveTabsFromStore();
    this.retrieveSelectedBoatClassesFromStore();
    this.determineSelectedEntityId();
  }

  showDetails() {
    const currentUrl = this.route.snapshot['_routerState'].url;
    this.entityFormFacade.navigateToDetails( this.selectedEntityId, currentUrl );
  }

  showList() {
    const currentUrl = this.route.snapshot['_routerState'].url;
    const goToUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')).substring(0, currentUrl.lastIndexOf('/'));
    this.entityFormFacade.navigateToList( goToUrl );
  }

  // protected, private helper methods
  private determineSelectedEntityId() {
    this.selectedEntity$.pipe( takeUntil( this.onDestroy$ )).subscribe( entity => {
      if ( entity ) {
        this.selectedEntityId = entity.id;
      } else {
        this.selectedEntityId = BaseUrlSegments.NewEntity;
      }
    });
  }

  retrieveActiveTabsFromStore() {
    this.currentTab$ = this.activeTabService.currentTab();
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '../' + entityId + '/' + BaseUrlSegments.DetailsForm;
  };

  private retrieveSelectedBoatClassesFromStore() {
    this.selectedEntity$ = this.entityFacade.current$;
  }
}
