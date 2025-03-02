import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  
  providers: [

    provideRouter(routes),
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
