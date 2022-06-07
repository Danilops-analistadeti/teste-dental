import { KeyValue } from '@angular/common';
import { INDEXER, ModulationType, PaymentDayType } from '@energy-contracting';
import { OfferType } from '../enums/offer-type.enum';

export interface ResourcesEnergy {
  offerType: KeyValue<string, OfferType>[];
  paymentDayType: KeyValue<string, PaymentDayType>[];
  modulationType: KeyValue<string, ModulationType>[];
  indexer: KeyValue<string, INDEXER>[];
}
