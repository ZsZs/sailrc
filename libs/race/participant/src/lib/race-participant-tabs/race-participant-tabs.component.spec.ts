import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceParticipantTabsComponent } from './race-participant-tabs.component';

describe('RaceParticipantTabsComponent', () => {
  let component: RaceParticipantTabsComponent;
  let fixture: ComponentFixture<RaceParticipantTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceParticipantTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceParticipantTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
