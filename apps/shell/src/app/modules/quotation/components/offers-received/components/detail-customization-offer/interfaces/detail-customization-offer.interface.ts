import { FinancialGuarantee } from '@energy-contracting';

export interface DetailCustomizationOffer {
  indexer: string;
  minimumSeasonality?: number;
  maximumSeasonality?: number;
  minimumFlexibility?: number;
  maximumFlexibility?: number;
  minimalModulation?: number;
  maximumModulation?: number;
  modulationType?: string;
  financialGuarantee?: FinancialGuarantee[];
  close: boolean;
}
