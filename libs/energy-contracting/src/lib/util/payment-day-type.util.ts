import { PaymentDayType } from '../enums/payment-day-type.enum';

export function getPaymentDayTypeFormatted(paymentDayType: string): string {
    return paymentDayType == PaymentDayType.CONSECUTIVE_DAY ? 'DC' : 'DU';
}
