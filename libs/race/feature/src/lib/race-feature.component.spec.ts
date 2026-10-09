import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFeatureComponent } from './race-feature.component';

describe('RaceManagementComponent', () => {
  let component: RaceFeatureComponent;
  let fixture: ComponentFixture<RaceFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RaceFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
