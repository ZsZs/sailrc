import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantCaptureComponent } from './participant-capture.component';

describe('ParticipantCaptureComponent', () => {
  let component: ParticipantCaptureComponent;
  let fixture: ComponentFixture<ParticipantCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantCaptureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
