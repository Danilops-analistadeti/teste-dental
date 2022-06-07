import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  EnergySource,
  ModulationType,
  PaymentDayType,
  PriceType,
  QuotationType,
  SubMarketRegion
} from '../../public-api';
import { EnumHelper } from './enum-helper';

@Injectable()
export class EnumUtil {
  constructor(private enumHelper: EnumHelper) {}

  getPriceType(value: string): KeyValue<string, PriceType> {
    return this.enumHelper.getTransform(PriceType, value) as unknown as KeyValue<string, PriceType>;
  }

  getEnergySource(value: string): KeyValue<string, EnergySource> {
    return this.enumHelper.getTransform(EnergySource, value) as unknown as KeyValue<string, EnergySource>;
  }

  getQuotationType(value: string): KeyValue<string, QuotationType> {
    return this.enumHelper.getTransform(QuotationType, value) as unknown as KeyValue<string, QuotationType>;
  }

  getModulationType(value: string): KeyValue<string, ModulationType> {
    return this.enumHelper.getTransform(ModulationType, value) as unknown as KeyValue<string, ModulationType>;
  }

  getPaymentDayType(value: string): KeyValue<string, PaymentDayType> {
    return this.enumHelper.getTransform(PaymentDayType, value) as unknown as KeyValue<string, PaymentDayType>;
  }

  getSubMarketRegion(value: string): KeyValue<string, SubMarketRegion> {
    return this.enumHelper.getTransform(SubMarketRegion, value) as unknown as KeyValue<string, SubMarketRegion>;
  }
}
