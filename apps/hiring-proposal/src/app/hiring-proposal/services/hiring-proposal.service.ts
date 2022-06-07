import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer, Quotation, QuotationFile } from '@energy-contracting';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HiringProposalService {
  constructor(private http: HttpClient) {}

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${environment.OFFER}/`, offer);
  }

  getOfferById(quotationId: string): Promise<Offer> {
    return this.http.get<Offer>(`${environment.OFFER}/${quotationId}/`).toPromise();
  }

  getQuotationById(quotationId: string): Observable<Quotation> {
    return this.http.get<Quotation>(`${environment.QUOTATION}${quotationId}/`);
  }

  refuserOffer(quotationId: string): Observable<string> {
    return this.http.post<string>(`${environment.REFUSE_OFFER}`, {
      quotation_id: quotationId
    });
  }

  getLastOfferByQuotationId(quotationId: string): Promise<Offer> {
    return this.http.get<Offer>(`${environment.QUOTATION}${quotationId}/offers/last`).toPromise();
  }

  getQuotationFiles(quotationId: string): Observable<QuotationFile[]> {
    return this.http.get<QuotationFile[]>(`${environment.QUOTATION}${quotationId}/files`);
  }
}
