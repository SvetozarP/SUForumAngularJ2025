import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors';
import { provideStore } from '@ngrx/store';
import { reducers } from './core/store';
import { PostEffects } from './core/store/posts/post.effects';
import { provideEffects } from '@ngrx/effects';
import { ThemesEffects } from './core/store/themes/themes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([ErrorInterceptor])
    ),
    provideStore(reducers),
    provideEffects([PostEffects, ThemesEffects])
  ]
};
