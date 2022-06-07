import {
  EnergySource,
  KeyValue,
  PriceType,
  QuotationStatus,
  QuotationType,
  SubMarketRegion
} from '@energy-contracting';

export const FILTER_OPERATIONS: KeyValue[] = [
  {
    key: 'listStatus',
    value: QuotationStatus
  },
  {
    key: 'listOperation',
    value: QuotationType
  },
  {
    key: 'listSubmarket',
    value: SubMarketRegion
  },
  {
    key: 'listFont',
    value: EnergySource
  },
  {
    key: 'listTypeProposal',
    value: PriceType
  }
];
