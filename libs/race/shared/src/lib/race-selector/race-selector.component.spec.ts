import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceSelectorComponent } from '@sailrc/race/shared';

describe('RaceSelectComponent', () => {
  let component: RaceSelectorComponent;
  let fixture: ComponentFixture<RaceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RaceSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
