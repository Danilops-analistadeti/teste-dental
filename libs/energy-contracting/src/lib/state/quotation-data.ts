import { CreateQuotation } from '../../public-api';

export class QuotationData {
  static readonly type = '[Quotation] create';
  constructor(public payload: CreateQuotation) { }
}
