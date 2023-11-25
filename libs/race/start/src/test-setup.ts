import 'zone.js';
import 'zone.js/testing';
import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { of } from "rxjs";

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

export class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}
