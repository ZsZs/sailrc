import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceTimerComponent } from './race-timer.component';

describe('RaceTimerComponent', () => {
  let component: RaceTimerComponent;
  let fixture: ComponentFixture<RaceTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceTimerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
