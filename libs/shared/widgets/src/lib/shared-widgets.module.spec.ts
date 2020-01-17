import { async, TestBed } from '@angular/core/testing';
import { SharedWidgetsModule } from './shared-widgets.module';

describe('SharedWidgetsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedWidgetsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedWidgetsModule).toBeDefined();
  });
});
