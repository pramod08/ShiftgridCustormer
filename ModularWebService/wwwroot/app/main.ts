/// <reference path="../../typings/globals/core-js/index.d.ts" />
/// <reference path="../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../typings/globals/node/index.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);