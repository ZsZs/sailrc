import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { RouterFacade, RouteStateService } from '@sailrc/shared/util';
import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { Observable, of, Subject } from 'rxjs';
import { BaseUrlSegments } from '../../../../util/src/lib/router/base-url-segments';
import { ActivatedRoute } from '@angular/router';
import { BaseEntityFacade } from '../..';

export abstract class BaseEntityContainerComponent<T extends BaseEntityInterface>  implements AfterViewInit, OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  protected entityId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( protected entityFacade: BaseEntityFacade<T>,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute ) {
  }

  // public event handlers
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.entityFacade.loadAll();
    this.subscribeToLoading();
  }

  showDetailsView(): void {
  }

  showListView(): void {
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '../' + entityId + '/' + BaseUrlSegments.DetailsForm;
  };

  private navigateToDetailsForm( entity: T ) {
    this.routerFacade.routerGo( [this.detailsRoute( entity.id )], {}, { relativeTo: this.route } )
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }
}
