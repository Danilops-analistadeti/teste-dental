import { makeEnviroment } from './make-environment';

const ENV_BUCKET = 'https://cotacao.hud.com.br';

const ENV_BUCKET_CREATE_QUOTATION = `${ENV_BUCKET}/create-quotation/remoteEntry.js`;
const ENV_BUCKET_AUTH = `${ENV_BUCKET}/auth/remoteEntry.js`;
const ENV_BUCKET_HIRING_PROPOSAL = `${ENV_BUCKET}/hiring-proposal/remoteEntry.js`;

const ENV_PATH = 'https://22d86ttdgb.execute-api.us-east-1.amazonaws.com/prd';
const ENV_LOGIN = 'https://lvf71vgk30.execute-api.us-east-1.amazonaws.com/prd';
const ENV_BACKOFFICE = 'https://2hjko1pno0.execute-api.us-east-1.amazonaws.com/prd';
const PRODUCTION = true;

export const environment = {
  ...makeEnviroment(
    ENV_LOGIN,
    ENV_PATH,
    ENV_BACKOFFICE,
    PRODUCTION,
    'GTM-5PJKV2W',
    'G-NVC4Q6GJHJ',
    'prd',
    ENV_BUCKET_CREATE_QUOTATION,
    ENV_BUCKET_AUTH,
    ENV_BUCKET_HIRING_PROPOSAL
  )
};
