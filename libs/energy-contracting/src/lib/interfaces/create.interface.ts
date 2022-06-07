import { KeyValue } from '@angular/common';
import { PriceType } from '../enums/price-type.enum';
import { Owner } from './owner.interface';

export interface Energy {
  ownerId: Owner | Owner[];
  quotationType: KeyValue<string, string>;
  startDate?: string;
  endDate?: string;
  energyVolumeAverage: string;
  energyVolumeHour: string;
  energySource: KeyValue<string, string>;
  subMarketRegion: KeyValue<string, string>;
  retusd: number;
  priceType: string | KeyValue<string, PriceType>;
  fullReparation: boolean;
}
