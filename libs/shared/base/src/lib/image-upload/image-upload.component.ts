import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ValidateFileTypeService } from '@processpuzzle/shared/util';
import { StorageService } from '../firestore/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraUploadComponent } from '@processpuzzle/shared/widgets';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sailrc-image-upload:not([ngrxFormsAction])',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ImageUploadComponent implements OnDestroy, OnInit {
  imageForm: FormGroup;
  imageToUpload: File;
  imageUrl: string | ArrayBuffer = "/assets/photo-placeholder.jpg";
  imageSubmitted = false;
  imageUploadProgress$: Observable<number>;
  menuButtonColor = 'primary';
  showCameraUpload = false;
  showFileUpload = false;
  private readonly IMAGE_NAME = 'profile_picture.jpg';
  private readonly CAMERA_DIALOG_HEIGHT = '700px';
  private readonly CAMERA_DIALOG_WIDTH = '800px';
  @Input() private readonly folder = 'image-upload';
  private readonly onDestroy$ = new Subject<void>();
  private imageName: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: any) => void = () => {};

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly fileTypeService: ValidateFileTypeService,
    public dialog: MatDialog
  ) { }

  // region angular life cycle hooks
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      image: [null, [Validators.required, this.image.bind(this)]]
    });

    this.imageForm
      .get('image')
      .valueChanges.pipe(takeUntil( this.onDestroy$ ))
      .subscribe((newValue) => {
        this.handleFileChange(newValue.files);
      });
  }

  // endregion

  // region event handling methods
  handleFileChange([image]) {
    this.imageToUpload = image;
    this.imageName = image.name;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      (this.imageUrl = loadEvent.target.result);
    }
    reader.readAsDataURL(image);
  }

  public onCameraUpload() {
    this.showCameraUpload = true;
    const dialogRef = this.dialog.open(CameraUploadComponent, {
      height: this.CAMERA_DIALOG_HEIGHT,
      width: this.CAMERA_DIALOG_WIDTH,
      data: {
        titleText: 'Take a photo of yourself.',
        height: this.CAMERA_DIALOG_HEIGHT,
        width: this.CAMERA_DIALOG_WIDTH
      }
    });

    dialogRef.afterClosed().pipe(takeUntil( this.onDestroy$ )).subscribe(
      data => {
        this.imageToUpload = new File( [data.imageData], this.IMAGE_NAME, {
          type: data.imageData.type
        });
        this.imageUrl = data.imageUrl;
        this.postImage();
      }
    );
  }

  public onFileUpload() {
    this.showFileUpload = true;
  }

  onMenuButtonMouseOut() {
    this.menuButtonColor='primary';
  }

  onMenuButtonMouseOver() {
    this.menuButtonColor='accent';
  }

  postImage() {
    this.imageSubmitted = true;
    const mediaFolderPath = `${ this.folder }`;

    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadDataAndGetMetadata(
      mediaFolderPath,
      this.imageToUpload,
    );

    this.imageUploadProgress$ = uploadProgress$;

    downloadUrl$
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          this.snackBar.open(`${ error.message } 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      ).subscribe((downloadUrl) => {
        this.imageSubmitted = false;
        this.showFileUpload = false;
        this._onChange( downloadUrl );
      });
  }
  // endregion

  // region public accessors and mutators
  public registerOnChange( fn: (value) => void ) {
    this._onChange = fn;
  }
  // endregion

  // region protected, private helper methods
  private image(photoControl: AbstractControl): { [key: string]: boolean } | null {
    if (photoControl.value) {
      const [kittyImage] = photoControl.value.files;
      return this.fileTypeService.validate(kittyImage) ? null : { image: true };
    }
    return;
  }
}
