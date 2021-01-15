import { async, TestBed } from '@angular/core/testing';
import { BoatDomainModule } from './boat-domain.module';

describe('BoatDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BoatDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BoatDomainModule).toBeDefined();
  });
});
