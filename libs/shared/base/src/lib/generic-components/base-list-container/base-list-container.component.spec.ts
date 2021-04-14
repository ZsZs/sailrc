import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListContainerComponent } from './base-list-container.component';

describe('BaseListContainerComponent', () => {
  let component: BaseListContainerComponent;
  let fixture: ComponentFixture<BaseListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
