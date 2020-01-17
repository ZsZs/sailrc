import { async, TestBed } from '@angular/core/testing';
import { SharedBaseModule } from './shared-base.module';

describe('SharedBaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedBaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedBaseModule).toBeDefined();
  });
});
