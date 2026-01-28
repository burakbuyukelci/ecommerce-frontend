import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Router ayarlarimizi buradan aliyoruz
import { provideHttpClient } from '@angular/common/http'; // Backend'e istek atmak icin

export const appConfig: ApplicationConfig = {
  providers: [
    // Router ayarlarimizi uygulamaya sagliyoruz
    provideRouter(routes),

    // HTTP istemcisini uygulamaya sagliyoruz
    provideHttpClient()
  ]
};
