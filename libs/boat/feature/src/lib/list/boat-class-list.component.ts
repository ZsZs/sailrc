import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ComponentDestroyService } from '@sailrc/shared/widgets';

import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@sailrc/shared/util';

@Component({
  selector: 'sailrc-boat-class-list',
  templateUrl: './boat-class-list.component.html',
  styleUrls: ['./boat-class-list.component.css']
})
export class BoatClassListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'name', 'yardstick'];
  dataSource = new MatTableDataSource<BoatClass>();
  selection = new SelectionModel<BoatClass>(true, []);
  isLoading: Observable<boolean>;

  constructor( private subscriptionService: ComponentDestroyService, private boatClassFacade: BoatClassFacade, private routerFacade: RouterFacade ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.boatClassFacade.loadAll();
    this.subscribeToBoatClasses();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: BoatClass ) {
    this.boatClassFacade.selectMany( this.selection.selected );
  }

  onRowClick( row: BoatClass ) {
    const boatClasses = [row];
    this.boatClassFacade.selectMany( boatClasses );
    this.routerFacade.routerGo( ['/boat-class/' + row.id + '/details'] );
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  checkboxLabel( row?: BoatClass ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.name}`;
  }

  deleteBoatClasses() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.boatClassFacade.delete( this.selection.selected[i] );
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.cancelSelections() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  newBoatClass() {
    this.routerFacade.routerGo( ['/boat-class/new/details'] );
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  private subscribeToBoatClasses() {
    this.boatClassFacade.all$.subscribe( ( boatClasses: BoatClass[]) => {
      this.dataSource.data = boatClasses;
    });
  }

  private subscribeToLoading() {
    this.isLoading = this.boatClassFacade.isLoading$;
  }
}
