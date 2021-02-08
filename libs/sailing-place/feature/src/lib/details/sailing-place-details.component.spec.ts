import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailingPlaceDetailsComponent } from './sailing-place-details.component';

describe('SailingPlaceDetailsComponent', () => {
  let component: SailingPlaceDetailsComponent;
  let fixture: ComponentFixture<SailingPlaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SailingPlaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingPlaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
