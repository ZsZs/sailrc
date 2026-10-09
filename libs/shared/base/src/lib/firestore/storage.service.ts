import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface FileUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({ providedIn: 'root'})
export class StorageService {

  constructor(private readonly storage: AngularFireStorage) {}

  // region public accesors
  public uploadDataAndGetMetadata( mediaFolderPath: string, data: File ): FileUploadMetadata {
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${data.name}`;
    return this.uploadTask( filePath, data );
  }
  // endregion

  // region protected, private helper methods
  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(path).getDownloadURL())
    );
  }

  private uploadTask( filePath: string, data: File ) {
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      data
    );
    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$( uploadTask, filePath )
    };
  }
  // endregion
}
