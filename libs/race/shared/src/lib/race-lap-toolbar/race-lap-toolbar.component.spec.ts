import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceLapToobarComponent } from './race-lap-toobar.component';

describe('RaceLapToobarComponent', () => {
  let component: RaceLapToobarComponent;
  let fixture: ComponentFixture<RaceLapToobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceLapToobarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceLapToobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
