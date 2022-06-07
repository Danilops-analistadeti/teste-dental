import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { environment } from 'environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn:
    'https://7a0bf2f85f3f4a08934508ef92dbfc25@o446310.ingest.sentry.io/5682915',
  environment: environment.ambiente,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
  .then((success) => console.log(`Bootstrap success ${success}`))
  .catch((err) => console.error(err));
