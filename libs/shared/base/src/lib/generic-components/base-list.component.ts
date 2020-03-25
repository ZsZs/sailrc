import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterFacade, routerGo } from '@sailrc/shared/util';
import { BaseEntityInterface } from '../firestore/base-entity.interface';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';

export abstract class BaseListComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  dataSource = new MatTableDataSource<T>();
  dataSourceSubscription: Subscription;
  selection = new SelectionModel<T>(true, []);
  isLoading$: Observable<boolean>;

  constructor(
    protected entityFacade: IEntityFacade<T>,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected tabName: string ) {}

  // public accessors and mutators
  addEntity() {
    this.routerFacade.routerGo( [this.detailsRoute( 'new' )] )
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
        this.dispatchDeleteEntityAction( this.selection.selected[i] );
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
    this.dispatchAllEntitiesRequestedAction();
    this.dataSourceSubscription = this.subscribeToSourceData();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: T ) {
    const entities = [row];
    this.dispatchSelectedEntitiesAction( entities );
  }

  onRowClick( row: T ) {
    const entities = [row];
    this.dispatchSelectedEntitiesAction( entities );
    this.routerFacade.routerGo( [this.detailsRoute( row.id )] )
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  protected abstract detailsRoute( entityId: string ): string;
  protected abstract dispatchAllEntitiesRequestedAction();
  protected abstract dispatchDeleteEntityAction( entity: T );
  protected abstract dispatchSelectedEntitiesAction( entities: T[] );

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }

  protected subscribeToSourceData(): Subscription {
    return this.entityFacade.all$.subscribe( ( data: T[] ) => {
      this.dataSource.data = data;
    });
  }
}
