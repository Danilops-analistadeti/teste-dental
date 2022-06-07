import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { QuotationProposalAction } from '../actions/quotation-proposal.actions';
import { QuotationProposal } from '../interfaces/quotation-proposal.interface';

const QUOTATION_PROPOSAL_TOKEN = new StateToken<QuotationProposal>(
  'quotationProposal'
);

@State<QuotationProposal>({
  name: QUOTATION_PROPOSAL_TOKEN,
  defaults: undefined,
})
@Injectable()
export class QuotationProposalState {
  @Action(QuotationProposalAction)
  authenticate(
    { setState }: StateContext<QuotationProposal>,
    action: QuotationProposalAction
  ): void {
    setState(action.payload);
  }
}
