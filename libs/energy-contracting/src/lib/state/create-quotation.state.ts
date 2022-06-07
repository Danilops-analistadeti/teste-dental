import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { CreateQuotation } from '../interfaces/create-quotation.interface';
import { ClearQuotation } from './clear-quotation';
import { QuotationData } from './quotation-data';

const CREATE_QUOTATION_STATE_TOKEN = new StateToken<QuotationData>(
  'createQuotation'
);

@State<QuotationData>({
  name: CREATE_QUOTATION_STATE_TOKEN,
  defaults: undefined,
})
@Injectable({ providedIn: 'any' })
export class CreateQuotationState {
  /**
   * Add an quotation to the application state
   *
   * @param param0: state context
   * @param param1: playload of QuuotationData action
   */

  @Action(QuotationData)
  setQuotation(
    { patchState, getState, setState }: StateContext<CreateQuotation>,
    action: QuotationData
  ): void {
    const state = getState();
    if (state?.customization || state?.energy || state?.paymentConditions || state?.shippingSettings) {
      patchState({
        ...state,
        ...action.payload,
      });
    } else {
      setState(action.payload);
    }
  }

  @Action(ClearQuotation)
  clearQuotation({ setState }: StateContext<CreateQuotation>): void {
    setState({});
  }
}
