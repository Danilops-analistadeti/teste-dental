import { FinancialGuarantee } from '../interfaces/financial-guarantee.interface';

export function getFinancialGuarantee(financialsGuarantee: any): string {
  return financialsGuarantee?.map((f) => f.name).join(', ') ?? '';
}
