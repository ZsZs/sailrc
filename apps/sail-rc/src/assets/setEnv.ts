/* eslint:disable */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFile, existsSync, mkdirSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { argv } = require('yargs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`write ${environmentFileContent} to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = './apps/sail-rc/src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts`, `environment.test.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./apps/sail-rc/src/environments/environment.prod.ts', '');
writeFileUsingFS('./apps/sail-rc/src/environments/environment.test.ts', '');
writeFileUsingFS('./apps/sail-rc/src/environments/environment.ts', '');

// choose the correct targetPath based on the environment chosen
let targetPath: string;
let isProduction = false;
let projectId = 'sailrc-test';

switch (environment) {
  case 'test':
    targetPath = './apps/sail-rc/src/environments/environment.test.ts';
    isProduction = true;
    break;
  case 'prod':
    targetPath = './apps/sail-rc/src/environments/environment.prod.ts';
    projectId = 'sailrc';
    isProduction = true;
    break;
  default:
    targetPath = './apps/sail-rc/src/environments/environment.ts';
    break;
}

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `

  // This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  import { NgxLoggerLevel } from 'ngx-logger';
  export const environment = {
    production: ${isProduction},
    logger : {
      serverLoggingUrl: 'http://localhost:3333',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.OFF,
      disableConsoleLogging: false
    },
    firebaseConfig : {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: '${projectId}.firebaseapp.com',
      databaseURL: 'https://${projectId}.firebaseio.com',
      projectId: '${projectId}',
      storageBucket: '${projectId}.appspot.com',
      messagingSenderId: '230076715051',
      appId: '1:230076715051:web:f4c58ea0b6617707711a6e'
    },
    
    googleCloudPlatform: {
      apiKey: '${process.env.GOOGLE_CLOUD_API_KEY}',
    }
  };

`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file/* eslint:enable */
