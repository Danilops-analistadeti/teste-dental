import { Injectable } from '@angular/core';
import { rangeMonthHours } from '../../util/range-hours.util';
import { round } from '../../util/round.util';

@Injectable({
  providedIn: 'root'
})
export class RoundingMwService {

  roundingMwh(value: string | number, rangeStart: Date | string, rangeEnd: Date | string): number | string {
    if (!rangeStart || !rangeEnd) {
      return value;
    }

    return round(+value * rangeMonthHours(rangeStart, rangeEnd), 3);
  }

  roundingMwAverage(value: string | number, rangeStart: Date | string, rangeEnd: Date | string): number | string {
    if (!rangeStart || !rangeEnd) {
      return value;
    }

    return round(+value / rangeMonthHours(rangeStart, rangeEnd), 6);
  }
}
