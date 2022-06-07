import { CURRENCY_OPTIONS_FIXED_PRICE } from '../constants/currency-options-fixed-price.constant';
import { CURRENCY_OPTIONS_PLD_SPREAD } from '../constants/currency-options-pld-spread.constant';
import { PriceType } from '../enums/price-type.enum';
import { QuotationType } from '../enums/quotation-type.enum';
import { ValidLabelOffer } from '../interfaces/valid-label-offer';

export const validPriceTypeOffer = (priceType: string, quotationType: string): ValidLabelOffer => {
  const validValueOffer: ValidLabelOffer = {};

  if (PriceType[priceType] === PriceType.FIXED) {
    validValueOffer.labelOfferValue = PriceType.FIXED;
    validValueOffer.currencyOptionsOfferValue = CURRENCY_OPTIONS_FIXED_PRICE;
    validValueOffer.value = '';
  } else {
    validValueOffer.labelOfferValue = PriceType.PLD;
    validValueOffer.currencyOptionsOfferValue = CURRENCY_OPTIONS_PLD_SPREAD;
    validValueOffer.tooltip = `Para valor negativo, digite o número referente ao
    ${validValueOffer?.labelOfferValue} e em seguida o sinal negativo`;
  }

  validValueOffer.labelOfferQuotationType = QuotationType[quotationType] === QuotationType.BUYER ? 'venda' : 'compra';

  return validValueOffer;
};
