import { Customization } from './customization.interface';
import { Energy } from './energy.interface';
import { PaymentConditions } from './payment-conditions.interface';
import { ShippingSettings } from './shipping-settings.interface';

export interface CreateQuotation {
  isCloned?: boolean;
  paymentConditions?: PaymentConditions;
  shippingSettings?: ShippingSettings;
  energy?: Energy;
  customization?: Customization;
}
