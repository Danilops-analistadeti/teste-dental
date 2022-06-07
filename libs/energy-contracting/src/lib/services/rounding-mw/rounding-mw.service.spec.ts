import { TestBed } from '@angular/core/testing';
import { RoundingMwService } from './rounding-mw.service';

describe('RoundingMwService', () => {
  let service: RoundingMwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundingMwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be rounding mwh', () => {
    const value = '1.000';

    const startRange = 'Wed Jan 20 2021 11:26:23 GMT-0300';
    const endRange = 'Wed Jan 20 2021 11:26:23 GMT-0300';

    const round = service.roundingMwh(value, startRange, endRange);

    expect(round).toEqual(24);
  });

  it('should be rounding average mw', () => {
    const value = '0.1223155';
    const startRange = 'Wed Jan 20 2021 11:26:23 GMT-0300';

    const endRange = 'Wed Jan 20 2021 11:26:23 GMT-0300';

    const roundAverage = service.roundingMwAverage(value, startRange, endRange);

    expect(roundAverage).toEqual(0.005096);
  });
});
