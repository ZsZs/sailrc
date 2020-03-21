// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  logger : {
    serverLoggingUrl: 'http://localhost:3333',
    level: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
    disableConsoleLogging: false
  },
  firebaseConfig : {
    apiKey: "AIzaSyA2_j6KKIr_yHDhOD_OZ7YU1wVjpdkISBI",
    authDomain: "sailrc-test.firebaseapp.com",
    databaseURL: "https://sailrc-test.firebaseio.com",
    projectId: "sailrc-test",
    storageBucket: "sailrc-test.appspot.com",
    messagingSenderId: "230076715051",
    appId: "1:230076715051:web:f4c58ea0b6617707711a6e"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
