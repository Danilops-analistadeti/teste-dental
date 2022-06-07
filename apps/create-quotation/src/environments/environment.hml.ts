import { makeEnviroment } from './make-environment';

const ENV_BUCKET = `https://esfera-frontend-angular-energy-contracting-hml-bucket.s3.amazonaws.com`;

const ENV_BUCKET_CREATE_QUOTATION = `${ENV_BUCKET}/create-quotation/remoteEntry.js`;
const ENV_BUCKET_AUTH = `${ENV_BUCKET}/auth/remoteEntry.js`;
const ENV_BUCKET_HIRING_PROPOSAL = `${ENV_BUCKET}/hiring-proposal/remoteEntry.js`;

const ENV_PATH = 'https://iwa58bsgzg.execute-api.us-east-1.amazonaws.com/hml';
const ENV_LOGIN = 'https://2r5hbb57u7.execute-api.us-east-1.amazonaws.com/hml';
const ENV_BACKOFFICE =
  'https://n37065omee.execute-api.us-east-1.amazonaws.com/hml/';
const PRODUCTION = true;

export const environment = {
  ...makeEnviroment(
    ENV_LOGIN,
    ENV_PATH,
    ENV_BACKOFFICE,
    PRODUCTION,
    'GTM-N9K4HN9',
    'hml',
    ENV_BUCKET_CREATE_QUOTATION,
    ENV_BUCKET_AUTH,
    ENV_BUCKET_HIRING_PROPOSAL
  ),
};
