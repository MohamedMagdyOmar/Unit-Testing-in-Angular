// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import '../node_modules/zone.js/dist/long-stack-trace-zone';
import '../node_modules/zone.js/dist/proxy';
import '../node_modules/zone.js/dist/sync-test';
import '../node_modules/zone.js/dist/jasmine-patch';
import '../node_modules/zone.js/dist/async-test';
import '../node_modules/zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
