import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraUploadComponent } from './camera-upload.component';

describe('CameraUploadComponent', () => {
  let component: CameraUploadComponent;
  let fixture: ComponentFixture<CameraUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
