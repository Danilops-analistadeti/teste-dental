import { round } from './round.util';

describe('RoundingMwService', () => {
    it('should be rouding precison three', () => {
        const value = '1230.124967';
        const roundThree = round(value, 3);

        expect(roundThree).toEqual(1230.125);
    });

    it('should be rounding precison six', () => {
        const value = '0.1223155';

        const roundAverage = round(value, 6);

        expect(roundAverage).toEqual(0.122316);
    });
});
