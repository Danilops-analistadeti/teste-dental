import { CurrencyMaskConfig } from '@esferaenergia/esfera-ui';

export const CURRENCY_OPTIONS_FIXED_PRICE: CurrencyMaskConfig = {
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    allowZero: false,
    align: 'center',
    nullable: false,
    prefix: '',
    precision: 2,
    suffix: '',
    max: 999999,
};
