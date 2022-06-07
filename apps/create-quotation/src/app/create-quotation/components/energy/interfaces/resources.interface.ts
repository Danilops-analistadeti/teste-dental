import { KeyValue } from '@angular/common';
import { EnergySource, PriceType, QuotationType, SubMarketRegion } from '@energy-contracting';

export interface Resources {
  priceType: KeyValue<string, PriceType>[];
  energySource: KeyValue<string, EnergySource>[];
  quotationType: KeyValue<string, QuotationType>[];
  subMarketRegion: KeyValue<string, SubMarketRegion>[];
}
