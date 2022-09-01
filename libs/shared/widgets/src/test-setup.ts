import 'jest-preset-angular';
import { of } from 'rxjs';
import { FileUploadMetadata } from '@processpuzzle/shared/base';

export class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}

export class StorageServiceStub {
  public uploadDataAndGetMetadata(mediaFolderPath: string, data: File): FileUploadMetadata {
    return {
      uploadProgress$: of(0),
      downloadUrl$: of(''),
    };
  }
}
