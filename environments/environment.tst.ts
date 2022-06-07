import { makeEnviroment } from './make-environment';

const ENV_BUCKET = 'https://cotacao.tst.hud.com.br';

const ENV_BUCKET_CREATE_QUOTATION = `${ENV_BUCKET}/create-quotation/remoteEntry.js`;
const ENV_BUCKET_AUTH = `${ENV_BUCKET}/auth/remoteEntry.js`;
const ENV_BUCKET_HIRING_PROPOSAL = `${ENV_BUCKET}/hiring-proposal/remoteEntry.js`;

const ENV_PATH = 'https://znvu5psnl5.execute-api.us-east-1.amazonaws.com/tst';
const ENV_LOGIN = 'https://l3wytie3bb.execute-api.us-east-1.amazonaws.com/tst';
const ENV_BACKOFFICE = 'https://dd9yvy7odj.execute-api.us-east-1.amazonaws.com/tst';
const PRODUCTION = true;

export const environment = {
  ...makeEnviroment(
    ENV_LOGIN,
    ENV_PATH,
    ENV_BACKOFFICE,
    PRODUCTION,
    'GTM-N9K4HN9',
    'G-EQP82JLXDV',
    'tst',
    ENV_BUCKET_CREATE_QUOTATION,
    ENV_BUCKET_AUTH,
    ENV_BUCKET_HIRING_PROPOSAL
  )
};
