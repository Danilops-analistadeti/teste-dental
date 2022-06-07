import { FormControl, Validators } from '@angular/forms';
import { PaymentDayType } from '@energy-contracting';
import { OfferType } from '../enums/offer-type.enum';

export const ENERGY_FORM = {
  offerType: new FormControl(Object.keys(OfferType)[0]),
  energyVolumeAverage: new FormControl('', Validators.required),
  energyVolumeHour: new FormControl('', Validators.required),
  paymentDayType: new FormControl(Object.keys(PaymentDayType)[0], Validators.required),
  retusd: new FormControl('', Validators.required),
  paymentBusinessDay: new FormControl(
    6,
    Validators.compose([Validators.required, Validators.min(1), Validators.max(25)])
  ),
  proposalExpiration: new FormControl('', Validators.required),
  auxProposalExpiration: []
};
