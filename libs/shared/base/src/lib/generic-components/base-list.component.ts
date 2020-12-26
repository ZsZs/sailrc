import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterFacade } from '@sailrc/shared/util';
import { BaseEntityInterface } from '../..';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { BaseUrlSegments } from './base-url-segments';
import { ActivatedRoute } from '@angular/router';

export abstract class BaseListComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: true} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: true} ) paginator: MatPaginator;
  dataSource = new MatTableDataSource<T>();
  dataSourceSubscription: Subscription;
  selection = new SelectionModel<T>(true, []);
  isLoading$: Observable<boolean>;

  protected constructor(
    protected entityFacade: IEntityFacade<T>,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected route: ActivatedRoute,
    protected readonly tabName: string ) {}

  // public accessors and mutators
  addEntity() {
    this.routerFacade.routerGo( [this.detailsRoute( BaseUrlSegments.NewEntity )], {}, { relativeTo: this.route } )
  }

  checkboxLabel( row?: T ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.id }`;
  }

  deleteEntities() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.entityFacade.delete( this.selection.selected[i] );
      }

      this.selection.clear();
    }
  }

  doFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSelected( row: T ) {
    return this.selection.isSelected( row );
  }

  masterToggle() {
    this.isAllSelected() ?
      this.cancelSelections() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
    this.componentDestroyService.unsubscribeComponent$.next();
    this.activeTabService.tabIsInActive( this.tabName );
  }

  ngOnInit() {
    this.activeTabService.tabIsActive( this.tabName );
    this.entityFacade.loadAll();
    this.dataSourceSubscription = this.subscribeToSourceData();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: T ) {
    if ( this.isSelected( row ) ) {
      this.entityFacade.selectMore( [row] );
    } else {
      this.entityFacade.deselectMany( [row] );
    }
    if ( this.selection.selected.length === 1 ) {
      this.entityFacade.select( this.selection.selected[0] );
    } else {
      this.entityFacade.deselect();
    }
  }

  onRowClick( row: T ) {
    this.entityFacade.select( row );
    this.navigateToDetailsForm( row );
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  protected detailsRoute( entityId: string ): string {
    return '../' + entityId + '/' + BaseUrlSegments.DetailsForm;
  };

  private navigateToDetailsForm( entity: T ) {
    this.routerFacade.routerGo( [this.detailsRoute( entity.id )], {}, { relativeTo: this.route } )
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }

  protected subscribeToSourceData(): Subscription {
    return this.entityFacade.all$.subscribe( ( data: T[] ) => {
      this.dataSource.data = data;
    });
  }
}
