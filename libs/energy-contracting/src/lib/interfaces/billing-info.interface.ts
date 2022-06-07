import { Address } from './address.interface';
import { Client } from './client.interface';

export interface BillingInfo {
  id?: string;
  title: string;
  name: string;
  cnpj: string;
  numberState: string;
  numberBank: string;
  numberAgency: string;
  numberInvoice?: string;
  email: string;
  phone: string;
  address?: Address;
  nameBank?: string;
  company: Client;
}
