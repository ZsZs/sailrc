import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacePlanningComponent } from './race-planning.component';

describe('RacePreparationComponent', () => {
  let component: RacePlanningComponent;
  let fixture: ComponentFixture<RacePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacePlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
