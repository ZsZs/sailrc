import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailingPlaceComponent } from './sailing-place.component';

describe('SailingPlaceComponent', () => {
  let component: SailingPlaceComponent;
  let fixture: ComponentFixture<SailingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SailingPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
