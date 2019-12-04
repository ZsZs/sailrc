import { async, TestBed } from '@angular/core/testing';
import { SharedAuthenticationDomainModule } from './shared-authentication-domain.module';

describe('SharedAuthenticationDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAuthenticationDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAuthenticationDomainModule).toBeDefined();
  });
});
