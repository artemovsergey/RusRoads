import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ɵNoopNgZone, NgZone, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationDriver } from '@angular/animations/browser';
import { noop } from 'rxjs';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  
  providers: [


    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},

    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(),
    provideAnimationsAsync(), provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
