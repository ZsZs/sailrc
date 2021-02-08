import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailingPlaceTabsComponent } from './sailing-place-tabs.component';

describe('SailingPlaceTabsComponent', () => {
  let component: SailingPlaceTabsComponent;
  let fixture: ComponentFixture<SailingPlaceTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SailingPlaceTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingPlaceTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
