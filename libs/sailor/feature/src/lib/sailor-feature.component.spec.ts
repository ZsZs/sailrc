import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorFeatureComponent } from './sailor-feature.component';

describe('SailorFeatureComponent', () => {
  let component: SailorFeatureComponent;
  let fixture: ComponentFixture<SailorFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SailorFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
