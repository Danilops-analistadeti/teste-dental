import { Injectable } from '@angular/core';
import { Offer } from '@energy-contracting';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { OfferAction } from '../actions/hiring-proposal.action';

const OFFER_TOKEN = new StateToken<OfferAction>('offer');

@State<Partial<Offer>>({
  name: OFFER_TOKEN
})
@Injectable()
export class OfferState {
  /**
   * Add an offer to the application state
   *
   * @param param0: state context
   * @param param1: playload of HiringProposal action
   */

  @Action(OfferAction)
  setHiringProposal({ patchState, getState, setState }: StateContext<Partial<Offer>>, action: OfferAction): void {
    const state = getState();
    if (state && Object.keys(state)?.length) {
      patchState({
        ...state,
        ...action.payload
      });
    } else {
      setState(action.payload);
    }
  }
}
