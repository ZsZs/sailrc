import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSourceListComponent } from './registration-source-list.component';

describe('RegistrationSourceListComponent', () => {
  let component: RegistrationSourceListComponent;
  let fixture: ComponentFixture<RegistrationSourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationSourceListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
