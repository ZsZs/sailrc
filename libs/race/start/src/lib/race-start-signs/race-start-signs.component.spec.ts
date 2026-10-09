import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStartSignsComponent } from './race-start-signs.component';
import { MatSnackBar} from "@angular/material/snack-bar";
import { MatSnackBarStub } from "../../test-setup";
import { LoggerTestingModule } from "ngx-logger/testing";
import { MatSliderModule } from "@angular/material/slider";
import { Lap, LapFacade } from "@sailrc/race/domain";
import { of } from 'rxjs';

describe('RaceStartSignsComponent', () => {
  class LapFacadeStub {
    current$ = of( new Lap())
  }
  let component: RaceStartSignsComponent;
  let fixture: ComponentFixture<RaceStartSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaceStartSignsComponent],
      imports: [LoggerTestingModule, MatSliderModule],
      providers: [
        { provide: LapFacade, useClass: LapFacadeStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStartSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
