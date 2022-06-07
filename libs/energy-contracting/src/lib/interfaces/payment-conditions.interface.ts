import { BillingInfo } from '../interfaces/billing-info.interface';

export interface PaymentConditions {
  indexer: string;
  billingInfo: string | BillingInfo;
  paymentBusinessDay: string;
  paymentDayType: string;
}
