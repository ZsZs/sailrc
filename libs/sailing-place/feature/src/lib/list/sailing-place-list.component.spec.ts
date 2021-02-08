import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailingPlaceListComponent } from './sailing-place-list.component';

describe('SailingPlaceListComponent', () => {
  let component: SailingPlaceListComponent;
  let fixture: ComponentFixture<SailingPlaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SailingPlaceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingPlaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
