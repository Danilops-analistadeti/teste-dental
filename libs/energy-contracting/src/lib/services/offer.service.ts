import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Offer } from '../interfaces/offer.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  setStatusOffer(offer: Partial<Offer>): Observable<Offer> {
    const putOffer = {
      status: offer.status,
      revisionObservation: offer?.revisionObservation,
    };
    return this.httpClient.put<Offer>(
      `${environment.OFFER}/${offer.id}/`,
      putOffer
    );
  }
}
