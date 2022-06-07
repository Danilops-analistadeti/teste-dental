import { Address } from "./address.interface";

export interface ClientBillingInfo {
  cnpj: string;
  name: string;
  address: Address;
}
