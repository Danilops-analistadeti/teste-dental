import { makeEnviroment } from './make-environment';

const ENV_BUCKET = '';

const ENV_BUCKET_CREATE_QUOTATION = `${ENV_BUCKET}3000/remoteEntry.js`;
const ENV_BUCKET_AUTH = `${ENV_BUCKET}3300/remoteEntry.js`;
const ENV_BUCKET_HIRING_PROPOSAL = `${ENV_BUCKET}3100/remoteEntry.js`;

const ENV_PATH = '';
const ENV_LOGIN = '';
const ENV_BACKOFFICE = '';
const PRODUCTION = true;

export const environment = {
  ...makeEnviroment(
    ENV_LOGIN,
    ENV_PATH,
    ENV_BACKOFFICE,
    PRODUCTION,
    'GTM-N9K4HN9',
    'G-EQP82JLXDV',
    'hml',
    ENV_BUCKET_CREATE_QUOTATION,
    ENV_BUCKET_AUTH,
    ENV_BUCKET_HIRING_PROPOSAL
  )
};
