import { DecimalPipe, registerLocaleData } from '@angular/common';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConvertDecimalPipe } from './convert-decimal.pipe';

registerLocaleData(localePt, localePtExtra);

describe('ConvertDecimalPipe', () => {
  let pipe: ConvertDecimalPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConvertDecimalPipe,
        DecimalPipe,
        { provide: LOCALE_ID, useValue: 'pt' },
      ],
    });
    pipe = TestBed.inject(ConvertDecimalPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be transform decimal with comma', () => {
    const value = '1,000000';
    const decimalPipe = pipe.transform(value, 6);

    expect(decimalPipe.convertedDecimal).toEqual('1');
  });

  it('should be transform decimal with dot', () => {
    const value = '1.000';

    const decimalPipe = pipe.transform(value, 6);

    expect(decimalPipe.convertedDecimal).toEqual('1.000');
  });

  it('should be transform decimal', () => {
    const value = '1000';

    const decimalPipe = pipe.transform(value, 6);

    expect(decimalPipe.convertedDecimal).toEqual('1.000');
  });

  it('should be transform decimal value', () => {
    const value = '1.000';

    const decimalPipe = pipe.transform(value, 6);

    expect(decimalPipe.convertedDecimal).toEqual('1.000');
  });

  it('should be replace string value', () => {
    const value = '1000';

    const replacedValue = pipe.replacedStringValue(value, false);

    expect(replacedValue).toEqual('1000');
  });

  it('should be replace string value with dot', () => {
    const value = '1.000';

    const replacedValue = pipe.replacedStringValue(value, false);

    expect(replacedValue).toEqual('1000');
  });


  it('should be replace string value with comma', () => {
    const value = '1,000';

    const replacedValue = pipe.replacedStringValue(value, false);

    expect(replacedValue).toEqual('1.000');
  });

  it('should be replace string value with zero and decimal plates', () => {
    const value = '0,953412';

    const replacedValue = pipe.replacedStringValue(value, false);

    expect(replacedValue).toEqual('0.953412');
  });
});
