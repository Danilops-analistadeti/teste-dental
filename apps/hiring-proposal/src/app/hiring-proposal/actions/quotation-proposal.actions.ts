import { QuotationProposal } from '../interfaces/quotation-proposal.interface';

export class QuotationProposalAction {
  static readonly type = '[Quotation] proposal';
  constructor(public payload?: QuotationProposal) { }
}
