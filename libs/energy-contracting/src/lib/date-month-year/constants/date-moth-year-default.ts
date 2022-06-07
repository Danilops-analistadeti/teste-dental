import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const DATE_MOTH_YEAR_DEFAULT: NgxMatDateFormats = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
