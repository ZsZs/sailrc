import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFieldTabsComponent } from './race-field-tabs.component';

describe('RaceFieldTabsComponent', () => {
  let component: RaceFieldTabsComponent;
  let fixture: ComponentFixture<RaceFieldTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceFieldTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFieldTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
