import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

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
  ],
};
