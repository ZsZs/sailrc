import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logger : {
    serverLoggingUrl: 'http://localhost:68552',
    level: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true
  },
  firebaseConfig : {
    apiKey: "AIzaSyCT4b6sqhWAFnBgZlcPBLiYYncsYGN9BFQ",
    authDomain: "sailrc-prod.firebaseapp.com",
    databaseURL: "https://sailrc-prod.firebaseio.com",
    projectId: "sailrc-prod",
    storageBucket: "sailrc-prod.appspot.com",
    messagingSenderId: "1088445437049",
    appId: "1:1088445437049:web:ed822d1a431beab32030a8",
    measurementId: "G-NRB37SWHPL"
  }
};
