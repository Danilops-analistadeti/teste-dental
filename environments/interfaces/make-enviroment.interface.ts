export interface MakeEnviroment {
  version: string;
  production: boolean;
  ambiente: string;
  TAG_MANAGER: string;
  GOOGLE_ANALYTICS?: string;
  QUOTATION: string;
  QUOTATIONS: string;
  OFFER: string;
  REFUSE_OFFER: string;
  LOGIN: string;
  LOGIN_TOKEN_HUD: string;
  CLIENTS: string;
  CLIENT: string;
  COMPANY_GROUPS: string;
  COMPANY_GROUP: string;
  COMPANY: string;
  AGENTS: string;
  BACKOFFICE: string;
  BILLING_INFO: string;
  ENV_PATH: string;
  USER: string;
  USERS: string;
  ENV_BUCKET_CREATE_QUOTATION: string;
  ENV_BUCKET_AUTH: string;
  ENV_BUCKET_HIRING_PROPOSAL: string;
  DEFAULT_DATE: string;
  LGPD_CONFIDENTIALITY_PDF: string;
  LGPD_TERMS_OF_USE_PDF: string;
}
