import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceAnalysisComponent } from './race-analysis.component';
import { CommonDependenciesModule } from '../common-dependencies.module';

describe('RaceAnalysisComponent', () => {
  let component: RaceAnalysisComponent;
  let fixture: ComponentFixture<RaceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonDependenciesModule],
      declarations: [RaceAnalysisComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
