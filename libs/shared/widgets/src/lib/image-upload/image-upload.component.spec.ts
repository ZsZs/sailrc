import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ImageUploadComponent } from './image-upload.component';
import { Component, ViewChild } from '@angular/core';
import { MatDialogMock, MatSnackBarStub, StorageServiceStub } from "../../test-setup";
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from "@processpuzzle/shared/base";
import { ValidateFileTypeService } from '@processpuzzle/shared/util';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";


describe('ImageUploadComponent', () => {
  @Component({
    selector: `sailrc-host-component`,
    template: `<h1>Testbed for ImageUploadComponent</h1>
      <sailrc-image-upload [folder]="imageFolder"></sailrc-image-upload>`,
  })
  class TestHostComponent {
    imageFolder: string;
    @ViewChild(ImageUploadComponent) public imageUploadComponent: ImageUploadComponent;
  }

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let imageUploadComponent: ImageUploadComponent;
  let imageUploadElement: HTMLElement;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageUploadComponent, TestHostComponent],
      imports: [ FormsModule, MatIconModule, MatMenuModule, ReactiveFormsModule ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: StorageService, useClass: StorageServiceStub },
        ValidateFileTypeService
      ]
    }).compileComponents();
  });

  beforeEach( () => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance
    testHostFixture.detectChanges();

    imageUploadComponent = testHostComponent.imageUploadComponent;
    imageUploadElement = testHostFixture.debugElement.nativeElement.querySelector('sailrc-image-upload');
  })

  describe('initializations', () => {
    it('should create', () => expect(imageUploadComponent).toBeTruthy());
    it('imageUrl: string', () => expect(imageUploadComponent.imageUrl).toBe('/assets/photo-placeholder.jpg'));
    it('folder: string', () => expect(imageUploadComponent.folder).toBe('image-upload'));
    it('imageForm: FormGroup, is invalid', () => expect(imageUploadComponent.imageForm.valid).toBeFalsy());
    it('imageToUpload: File, is undefined', () => expect(imageUploadComponent.imageToUpload).toBeUndefined());
    it('imageName: string, is undefined', () => expect(imageUploadComponent['imageName']).toBeUndefined());
  });

  describe('HTML structure', () => {
    it('has <sailrc-image-upload> element', () => expect(imageUploadElement).toBeTruthy());
    it('has <div class="photo-actions">', () => expect(imageUploadElement.querySelector('div.photo-actions')).toBeTruthy());
    it('has <img class="preview-image">', () => expect(imageUploadElement.querySelector('img.preview-image')).toBeTruthy());
    it('has <button>', () => expect(imageUploadElement.querySelector('button')).toBeTruthy());
  });

  describe('@Input', () => {
    it('folder: string value is set by parent', () => {
      testHostComponent.imageFolder = 'other-folder';
      testHostFixture.detectChanges();
      expect(imageUploadComponent.folder).toBe('other-folder');
    });
  });

  describe('angular lifecycle hooks', () => {
    it('OnInit configures imageForm', () => {
      const image = imageUploadComponent.imageForm.controls['image'];
      expect(image.valid).toBeFalsy();
      expect(image.errors['required']).toBeTruthy();
    });
  });

  describe('DOM events', () => {
    it('button.mouseover(), changes buttons colour to accent', () => {
      const button: HTMLButtonElement = imageUploadElement.querySelector('button');
      const mouseover = new MouseEvent('mouseover');
      button.dispatchEvent(mouseover);
      testHostFixture.detectChanges();
      expect(imageUploadComponent.menuButtonColor).toBe('accent');
    });

    it.skip('ngx-mat-file-input valueChanges(), changes file properties', () => {
      console.log(testHostFixture.debugElement.nativeElement.innerHTML);
      //      const imageFormControl = testHostFixture.debugElement.nativeElement.querySelector('ngx-mat-file-input');
      const inputElement: HTMLInputElement = testHostFixture.debugElement.nativeElement.querySelector('input');
      inputElement.value = 'new-picture.gif';
      inputElement.dispatchEvent(new Event('image'));
      testHostFixture.detectChanges();
      expect(imageUploadComponent['imageName']).toBe('new-picture.gif');
    });
  });
});
