import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceParticipantListComponent } from './race-participant-list.component';

describe('RaceParticipantListComponent', () => {
  let component: RaceParticipantListComponent;
  let fixture: ComponentFixture<RaceParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceParticipantListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
