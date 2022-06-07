import { Address } from "../../interfaces/address.interface";
import { Client } from "../../interfaces/client.interface";

export interface CreateBillingInfo {
  title: string;
  name: string;
  cnpj: string;
  stateRecord: string
  municipalRecord?: string;
  bank: string;
  agency: string;
  accountNumber: string;
  emails: string[];
  phone: string;
  company: string | Client;
  address: Address | any;
}
