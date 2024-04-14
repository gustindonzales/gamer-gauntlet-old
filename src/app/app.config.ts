import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ClerkService } from './services/shared/clerk.service';
import { initializeAppFactory } from './app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot([], {
        developmentMode: !environment.production,
        selectorOptions: {
          suppressErrors: false,
          injectContainerState: false,
        },
      }),
      NgxsFormPluginModule.forRoot(),
    ),
    provideRouter(routes, withViewTransitions()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [ClerkService],
      multi: true,
    },
  ],
};
