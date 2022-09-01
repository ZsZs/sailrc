import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTimePickerComponent } from './start-time-picker.component';

describe('RaceStartTimeSelectorComponent', () => {
  let component: StartTimePickerComponent;
  let fixture: ComponentFixture<StartTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartTimePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
