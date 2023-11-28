import 'zone.js'
import 'zone.js/testing'
import { TestBed } from "@angular/core/testing";
import { EMPTY, of } from "rxjs";
import { BaseEntityInterface, FileUploadMetadata, IBaseEntityFacade } from "@processpuzzle/shared/base";
import fetchMock from 'jest-fetch-mock';
import { ngMocks } from 'ng-mocks';
import { mock } from "jest-mock-extended";
import { Entity, Key } from "@briebug/ngrx-auto-entity";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('image data')
    };
  }
};
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

export class GoogleMapsServiceStub {
  async loadGoogleMapsAPI(): Promise<boolean> {
    return Promise.resolve( true );
  }
}

export async function delayTestProcessing( milliSeconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliSeconds))
}

ngMocks.autoSpy('jest');

fetchMock.enableMocks();

@Entity({modelName: 'TestEntity', pluralName: 'testEntities', uriName: 'testEntity'})
export class TestEntity implements BaseEntityInterface {
  @Key id: string;
}

export const mockBaseEntityFacade = mock<IBaseEntityFacade<TestEntity>>();
mockBaseEntityFacade.all$ = EMPTY;
mockBaseEntityFacade.isLoading$ = EMPTY;

jest.setTimeout( 8000 );

