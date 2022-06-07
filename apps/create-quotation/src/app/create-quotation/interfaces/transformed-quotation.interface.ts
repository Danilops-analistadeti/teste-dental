import { Customization, Energy, PaymentConditions, QuotationFile, ShippingSettings } from '@energy-contracting';

export interface TransformedQuotation extends Energy, PaymentConditions, ShippingSettings, Customization {
  files: QuotationFile[];
}
