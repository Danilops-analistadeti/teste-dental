import { AbstractControl, ValidationErrors } from '@angular/forms';

export const validatorsMinValue = (control: AbstractControl): ValidationErrors =>
  (!control.value || control.value < 0) ?
    {
      customMinMax: {
        message:
          'Volume de energia tem que ser maior que zero'
      }
    } : null;

