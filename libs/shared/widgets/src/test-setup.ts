import 'jest-preset-angular/setup-jest';
import { of } from 'rxjs';
import { FileUploadMetadata } from '@processpuzzle/shared/base';
import fetchMock from 'jest-fetch-mock';

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

fetchMock.enableMocks();
