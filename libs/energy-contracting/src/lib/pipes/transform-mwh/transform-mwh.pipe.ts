import { Pipe, PipeTransform } from '@angular/core';
import { RoundingMwService } from '../../services/rounding-mw/rounding-mw.service';

@Pipe({
  name: 'transformMwh'
})
export class TransformMwhPipe implements PipeTransform {

  constructor(private roundingMwService: RoundingMwService) { }

  transform(value: string | number, rangeStart: Date | string, rangeEnd: Date | string): number | string {
    return this.roundingMwService.roundingMwh(value, rangeStart, rangeEnd);
  }

}
