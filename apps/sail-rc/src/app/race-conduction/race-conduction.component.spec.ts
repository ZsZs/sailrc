import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceConductionComponent } from './race-conduction.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';

describe('RaceConductionComponent', () => {
  let component: RaceConductionComponent;
  let fixture: ComponentFixture<RaceConductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceConductionComponent ],
      imports: [SharedMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceConductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
