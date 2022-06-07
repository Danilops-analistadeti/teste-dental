import { CompanyGroups } from './company-groups.interface';

export interface ShippingSettings {
  companyGroups?: string[] | CompanyGroups[];
  expiration?: string;
  proposalSubmission?: string;
}
