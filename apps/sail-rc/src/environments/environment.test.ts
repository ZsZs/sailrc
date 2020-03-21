
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
