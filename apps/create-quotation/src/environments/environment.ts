import { makeEnviroment } from './make-environment';

const ENV_BUCKET = `https://esfera-frontend-angular-energy-contracting-dev-bucket.s3.amazonaws.com`;

const ENV_BUCKET_CREATE_QUOTATION = `${ENV_BUCKET}/create-quotation/remoteEntry.js`;
const ENV_BUCKET_AUTH = `${ENV_BUCKET}/auth/remoteEntry.js`;
const ENV_BUCKET_HIRING_PROPOSAL = `${ENV_BUCKET}/hiring-proposal/remoteEntry.js`;

const ENV_PATH = 'https://xrekeaas1h.execute-api.us-east-1.amazonaws.com/dev';
const ENV_LOGIN = 'https://3ccsodqdua.execute-api.us-east-1.amazonaws.com/dev';
const ENV_BACKOFFICE =
  'https://2hm9xezu1j.execute-api.us-east-1.amazonaws.com/dev';
const PRODUCTION = true;

export const environment = {
  ...makeEnviroment(
    ENV_LOGIN,
    ENV_PATH,
    ENV_BACKOFFICE,
    PRODUCTION,
    'GTM-N9K4HN9',
    'dev',
    ENV_BUCKET_CREATE_QUOTATION,
    ENV_BUCKET_AUTH,
    ENV_BUCKET_HIRING_PROPOSAL
  ),
};
