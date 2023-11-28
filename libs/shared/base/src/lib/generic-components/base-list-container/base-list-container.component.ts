import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService } from '../../services/active-tab.service';
import { ComponentDestroyService } from '../../services/component-destroy.service';
import { BaseEntityInterface } from '../../auto-entity/base-entity.interface';
import { IEntityFormFacade } from '../../auto-entity-form/facade';
import { BaseListColumnDefinition } from './base-list-column-definition';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { BaseUrlSegments } from '@processpuzzle/shared/util';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sailrc-base-list-container',
  templateUrl: './base-list-container.component.html',
  styleUrls: ['./base-list-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BaseListContainerComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  @Input() displayedColumns: string[];
  @Input() columnDefinitions: BaseListColumnDefinition[];
  @Input() entityFormFacade: IEntityFormFacade<T>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<T>();
  dataSourceSubscription: Subscription;
  selection = new SelectionModel<T>(true, []);
  isLoading$: Observable<boolean>;
  protected entityFacade: IEntityFacade<T>;
  protected readonly onDestroy$ = new Subject<void>();
  protected tabName: string;

  constructor(protected route: ActivatedRoute, protected activeTabService: ActiveTabService, protected componentDestroyService: ComponentDestroyService) {}

  log(val) {
    console.log(val);
  }

  // public accessors and mutators
  addEntity() {
    this.navigateToDetailsForm(BaseUrlSegments.NewEntity);
  }

  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  deleteEntities() {
    if (this.selection.selected.length > 0) {
      for (let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.entityFacade.delete(this.selection.selected[i]);
      }

      this.selection.clear();
    }
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSelected(row: T) {
    return this.selection.isSelected(row);
  }

  masterToggle() {
    this.isAllSelected() ? this.cancelSelections() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
    this.componentDestroyService.unsubscribeComponent$.next();
    this.activeTabService.tabIsInActive(this.tabName);
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.entityFacade = this.entityFormFacade.entityFacade;
    this.tabName = this.entityFormFacade.info.modelName + '-list';
    this.activeTabService.tabIsActive(this.tabName);
    //    this.loadAllEntities();
    this.dataSourceSubscription = this.subscribeToSourceData();
    this.subscribeToLoading();
  }

  onChangeSelection(row?: T) {
    if (this.isSelected(row)) {
      this.entityFacade.selectMore([row]);
    } else {
      this.entityFacade.deselectMany([row]);
    }
    if (this.selection.selected.length === 1) {
      this.entityFacade.select(this.selection.selected[0]);
    } else {
      this.entityFacade.deselect();
    }
  }

  onRowClick(row: T) {
    this.entityFacade.select(row);
    this.navigateToDetailsForm(row.id);
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  protected loadAllEntities() {
    this.entityFacade.loadAll();
  }

  protected navigateToDetailsForm(entityId: string) {
    const currentUrl = this.route.snapshot['_routerState'].url;
    const detailsFormPath = currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '/' + entityId + '/details';
    this.entityFormFacade.navigateToDetails(detailsFormPath, currentUrl);
  }

  private subscribeToLoading() {
    this.isLoading$ = this.entityFacade.isLoading$;
  }

  protected subscribeToSourceData(): Subscription {
    return this.entityFacade.all$.pipe(takeUntil(this.onDestroy$)).subscribe((data: T[]) => {
      this.dataSource.data = data;
    });
  }
}
