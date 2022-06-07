import { FinancialGuarantee } from './financial-guarantee.interface';
import { Quotation } from './quotation.inteface';

export interface ConfirmProposal {
  offerQuotation: Quotation;
  paymentBusinessDay: number;
  retusd: number;
  price: number;
  proposalExpiration: Date;
  showRetusd: boolean;
  buttoName: string;
  title: string;
  companySellers: string;
  companyBuyers: string;
  energyVolumeAverage: string | number;
  priceType: string;
  offerId?: string;
  paymentDayType: string;
  indexer: string;
  minimumSeasonality?: number;
  maximumSeasonality?: number;
  minimumFlexibility?: number;
  maximumFlexibility?: number;
  minimalModulation?: number;
  maximumModulation?: number;
  modulationType?: string;
  financialGuarantee?: FinancialGuarantee[];
  offerType?: string;
}
