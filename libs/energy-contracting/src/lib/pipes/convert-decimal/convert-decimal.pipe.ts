import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { countDecimals } from '../../util/count-decimal.util';
import { ConvertDecimal } from '../interfaces/convert-decimal.interface';

@Pipe({
  name: 'convertDecimal'
})
export class ConvertDecimalPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: string | number, maxDecimals: string | number, isDecimal = false): ConvertDecimal {
    if (!value) {
      return {};
    }

    const valueReplaced: string | number = this.replacedStringValue(value, isDecimal);

    const decimalPlates = countDecimals(valueReplaced);
    const digitsInfo = decimalPlates > maxDecimals ? maxDecimals : decimalPlates;

    return {
      convertedDecimal: this.decimalPipe.transform(valueReplaced, `1.0-${digitsInfo}`),
      valueReplaced
    };

  }

  replacedStringValue(value: string | number, isDecimal: boolean): string | number {
    if (typeof value === 'number' && !isDecimal) {
      return value;
    } else if (!isDecimal) {
      const dot = /\./gi;
      const empty = /\ /gi;
      const comma = /\,/gi;
      value = value.toString().replace(empty, '').replace(dot, '').replace(comma, '.');
      return value;
    }

    return value;
  }
}


