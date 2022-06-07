import { FinancialGuarantee } from './financial-guarantee.interface';

export interface Customization {
  minimumSeasonality: number;
  maximumSeasonality: number;
  minimumFlexibility: number;
  maximumFlexibility: number;
  minimalModulation: number;
  maximumModulation: number;
  modulationType: string;
  financialGuarantee: string[] | FinancialGuarantee[];
}
