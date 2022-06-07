import { environment } from '../../../../../environments/environment';

export const ANALYTICS_SCRIPT = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${environment.GOOGLE_ANALYTICS}');
    `;
