import { ImageUploadViewAdapter } from './image-upload-view-adapter';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploadComponent } from './image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ImageUploadViewAdapter', () => {
  let imageUploadComponent: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;
  let imageUploadViewAdapter: ImageUploadViewAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageUploadComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadComponent);
    imageUploadComponent = fixture.componentInstance;
    fixture.detectChanges();
    imageUploadViewAdapter = new ImageUploadViewAdapter(imageUploadComponent);
  });
});
