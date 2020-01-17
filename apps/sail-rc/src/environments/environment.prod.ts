import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logger : {
    serverLoggingUrl: 'http://localhost:68552',
    level: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true
  }
};
