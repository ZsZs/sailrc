import { async, TestBed } from '@angular/core/testing';
import { BoatFeatureModule } from './boat-feature.module';

describe('BoatFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BoatFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BoatFeatureModule).toBeDefined();
  });
});
