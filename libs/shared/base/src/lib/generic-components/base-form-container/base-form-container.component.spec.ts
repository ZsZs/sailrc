import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormContainerComponent } from './base-form-container.component';

describe('BaseFormContainerComponent', () => {
  let component: BaseFormContainerComponent;
  let fixture: ComponentFixture<BaseFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFormContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
