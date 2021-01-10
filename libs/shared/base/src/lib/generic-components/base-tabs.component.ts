import { OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RouterFacade } from '@sailrc/shared/util';
import { ActiveTabService } from '@sailrc/shared/widgets';
import { BaseEntityInterface } from '@sailrc/shared/base';
import { BaseUrlSegments } from '@sailrc/shared/util';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { ActivatedRoute } from '@angular/router';

export abstract class BaseTabsComponent<T extends BaseEntityInterface> implements OnDestroy, OnInit {
  currentTab: Observable<string>;
  selectedEntity: Observable<T>;
  selectedEntityId: string;
  private readonly onDestroy = new Subject<void>();

  constructor(
    protected entityFacade: IEntityFacade<T>,
    protected activeTabService: ActiveTabService,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveActiveTabsFromStore();
    this.retrieveSelectedBoatClassesFromStore();
    this.determineSelectedEntityId();
  }

  showDetails() {
    this.routerFacade.routerGo( [this.selectedEntityId + '/' + BaseUrlSegments.DetailsForm], {}, { relativeTo: this.route } )
  }

  // protected, private helper methods
  private determineSelectedEntityId() {
    this.selectedEntity.pipe( takeUntil( this.onDestroy )).subscribe( entity => {
      if ( entity ) {
        this.selectedEntityId = entity.id;
      } else {
        this.selectedEntityId = BaseUrlSegments.NewEntity;
      }
    });
  }

  retrieveActiveTabsFromStore() {
    this.currentTab = this.activeTabService.currentTab();
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '../' + entityId + '/' + BaseUrlSegments.DetailsForm;
  };

  private retrieveSelectedBoatClassesFromStore() {
    this.selectedEntity = this.entityFacade.current$;
  }
}
