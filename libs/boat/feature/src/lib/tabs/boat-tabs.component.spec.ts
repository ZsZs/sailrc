import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatTabsComponent } from './boat-tabs.component';

describe('BoatTabsComponent', () => {
  let component: BoatTabsComponent;
  let fixture: ComponentFixture<BoatTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
