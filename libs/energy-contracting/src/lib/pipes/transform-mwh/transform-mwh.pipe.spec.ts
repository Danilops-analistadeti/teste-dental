import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RoundingMwService } from '../../services/rounding-mw/rounding-mw.service';
import { ConvertDecimalPipe } from '../convert-decimal/convert-decimal.pipe';
import { TransformMwhPipe } from './transform-mwh.pipe';

describe('TransformMwhPipe', () => {

  let pipe: TransformMwhPipe;
  let roundingMwService: RoundingMwService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransformMwhPipe,
        {
          provide: ConvertDecimalPipe,
          useValue: {
            transform: (value: string | number, maxDecimals: string | number, isDecimal = false): void => { }
          }
        },
        {
          provide: DecimalPipe, useValue: {
            transform: (value: any, format?: string, timezone?: string, locale?: string): void => { }
          }
        },
        {
          provide: RoundingMwService,
          useValue: {
            roundingMwh: (value: string | number, rangeStart: string, rangeEnd: string) => { }
          }
        }
      ],
    });
    pipe = TestBed.inject(TransformMwhPipe);
    roundingMwService = TestBed.inject(RoundingMwService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be transform average', () => {
    const value = 1234;

    const roundingMwAverageSpy = spyOn(roundingMwService, 'roundingMwh').and.returnValue(value);
    const startDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';
    const endDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';

    const roundingResponse = pipe.transform('1234', startDate, endDate);

    expect(roundingResponse).toEqual(value);
    expect(roundingMwAverageSpy).toHaveBeenCalled();
  });

});
