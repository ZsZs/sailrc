import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceLapContainerComponent } from './race-lap-container.component';

describe('RaceLapContainerComponent', () => {
  let component: RaceLapContainerComponent;
  let fixture: ComponentFixture<RaceLapContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceLapContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceLapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
