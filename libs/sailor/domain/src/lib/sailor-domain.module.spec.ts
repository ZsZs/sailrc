import { async, TestBed } from '@angular/core/testing';
import { SailorDomainModule } from './sailor-domain.module';

describe('SailorDomainSailorDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SailorDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SailorDomainModule).toBeDefined();
  });
});
