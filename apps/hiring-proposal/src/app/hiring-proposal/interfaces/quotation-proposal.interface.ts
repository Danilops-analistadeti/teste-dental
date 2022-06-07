import { Offer } from '@energy-contracting';

export interface QuotationProposal {
  interesse?: string;
  email?: string;
  quotationId?: string;
  quotationCompanyName?: string;
  offerCompanyName?: string;
  token?: string;
  offerId?: string;
  price?: number;
  offer?: Offer;
  refusedRevision?: string;
}
