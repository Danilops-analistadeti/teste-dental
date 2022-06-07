import { CurrencyMaskConfig } from '@esferaenergia/esfera-ui';

export interface ValidLabelOffer {
  labelOfferValue?: string;
  currencyOptionsOfferValue?: CurrencyMaskConfig;
  tooltip?: string;
  labelOfferQuotationType?: string;
  value?: string | undefined;
}
