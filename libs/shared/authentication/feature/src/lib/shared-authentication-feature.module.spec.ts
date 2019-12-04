import { async, TestBed } from '@angular/core/testing';
import { SharedAuthenticationFeatureModule } from './shared-authentication-feature.module';

describe('SharedAuthenticationFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAuthenticationFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAuthenticationFeatureModule).toBeDefined();
  });
});
