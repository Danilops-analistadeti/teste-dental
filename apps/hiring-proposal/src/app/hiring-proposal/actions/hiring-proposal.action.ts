import { Offer } from '@energy-contracting';

export class OfferAction {
  static readonly type = '[HiringProposal] create';
  constructor(public payload: Partial<Offer>) {}
}
