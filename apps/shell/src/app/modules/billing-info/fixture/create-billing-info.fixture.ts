import { CreateBillingInfo } from 'projects/energy-contracting/src/lib/create-billing-info/interfaces/create-billing-info.interface';

export const createBillingInfoFixture: CreateBillingInfo = {
  title: '',
  name: '',
  cnpj: '',
  stateRecord: '',
  bank: '',
  agency: '',
  accountNumber: '',
  phone: '',
  company: '',
  emails: [''],
  address: {
    city: '',
    number: '',
    complement: '',
    postalCode: '',
    street: '',
    neighborhood: '',
    state: ''
  }
}
