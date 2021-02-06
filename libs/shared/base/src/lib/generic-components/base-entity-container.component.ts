import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { RouterFacade } from '@processpuzzle/shared/util';
import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { Observable, Subject } from 'rxjs';
import { BaseUrlSegments } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { IBaseEntityFacade } from '../..';

@Component({template: ''})
export abstract class BaseEntityContainerComponent<T extends BaseEntityInterface>  implements OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  protected entityId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( @Inject('entityFacade') protected entityFacade: IBaseEntityFacade<T>,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute ) {
  }

  // public event handlers
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.entityFacade.loadAll();
    this.subscribeToLoading();
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
