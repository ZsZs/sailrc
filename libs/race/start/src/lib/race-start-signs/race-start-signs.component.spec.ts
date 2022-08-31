import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStartSignsComponent } from './race-start-signs.component';

describe('RaceStartSignsComponent', () => {
  let component: RaceStartSignsComponent;
  let fixture: ComponentFixture<RaceStartSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceStartSignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStartSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
