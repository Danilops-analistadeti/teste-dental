import { environment } from 'environments/environment';

export const WHITE_LIST_OPERATIONS = [
  { url: environment.QUOTATION, method: 'GET' },
  { url: environment.OFFER, method: 'POST' },
  { url: environment.OFFER, method: 'GET' },
  { url: environment.REFUSE_OFFER, method: 'POST' }
];
