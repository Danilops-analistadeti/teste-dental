import { Company } from './company.interface';

export interface CompanyGroup {
  name: string;
  companies: Array<Company>;
}
