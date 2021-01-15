import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassTabsComponent } from './boat-class-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '@sailrc/shared/material';

describe('BoatClassTabsComponent', () => {
  let component: BoatClassTabsComponent;
  let fixture: ComponentFixture<BoatClassTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassTabsComponent ],
      imports: [SharedMaterialModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
