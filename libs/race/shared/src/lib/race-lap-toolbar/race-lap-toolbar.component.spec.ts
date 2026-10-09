import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceLapToolbarComponent } from './race-lap-toolbar.component';

describe('RaceLapToobarComponent', () => {
  let component: RaceLapToolbarComponent;
  let fixture: ComponentFixture<RaceLapToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceLapToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceLapToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
