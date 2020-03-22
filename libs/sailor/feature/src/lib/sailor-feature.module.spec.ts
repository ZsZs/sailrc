import { async, TestBed } from '@angular/core/testing';
import { SailorFeatureModule } from './sailor-feature.module';

describe('SailorFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SailorFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SailorFeatureModule).toBeDefined();
  });
});
