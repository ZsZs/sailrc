import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacePlanningComponent } from './race-planning.component';
import { SharedMaterialModule } from '@sailrc/shared/material';

describe('RacePlanningComponent', () => {
  let component: RacePlanningComponent;
  let fixture: ComponentFixture<RacePlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacePlanningComponent ],
      imports: [SharedMaterialModule]
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
