import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListContainerComponent } from './base-list-container.component';
import { ActiveTabService, BaseListColumnDefinition, ComponentDestroyService, IEntityFormFacade } from '@processpuzzle/shared/base';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MockModule, MockProvider, MockProviders } from 'ng-mocks';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { mockBaseEntityFacade, mockEntityInfo, TestEntity, TestEntityFeatureFacade } from '../../../test-setup';

describe('BaseListContainerComponent', () => {

  @Component({
    selector: `sailrc-host-component`,
    template: `<h1>Testbed for ImageUploadComponent</h1>
      <sailrc-base-list-container 
        [displayedColumns]="displayedColumns" [columnDefinitions]='columnDefinitions' [entityFormFacade]='entityFormFacade'>
      </sailrc-base-list-container>`,
  })
  class TestHostComponent {
    displayedColumns: string[];
    columnDefinitions: BaseListColumnDefinition[];
    entityFormFacade: IEntityFormFacade<TestEntity>;
    @ViewChild(BaseListContainerComponent) public baseListContainerComponent: BaseListContainerComponent<TestEntity>;

    constructor( private testEntityFeatureFacade: TestEntityFeatureFacade ) {
      this.entityFormFacade = testEntityFeatureFacade;
    }
  }
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let component: BaseListContainerComponent<TestEntity>;
  let baseListContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseListContainerComponent, TestHostComponent],
      imports: [
        RouterTestingModule,
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
        MockModule(MatPaginatorModule),
        MockModule(MatTableModule),
        MockModule(MatToolbarModule)
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {_routerState: {url: 'http://localhost'}}}},
        MockProviders( ActiveTabService ),
        MockProvider( ComponentDestroyService, { unsubscribeComponent$: new Subject() }),
        MockProvider( TestEntityFeatureFacade, { entityFacade: mockBaseEntityFacade, info: mockEntityInfo })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();

    component = testHostComponent.baseListContainerComponent;
    baseListContainerElement = testHostFixture.debugElement.nativeElement.querySelector('sailrc-base-list-container');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
