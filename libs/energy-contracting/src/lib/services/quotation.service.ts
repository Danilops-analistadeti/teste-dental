import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpParamsScraper } from '@esferaenergia/esfera-ui';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  Offer,
  OfferStatus,
  Quotation,
  QuotationCancelResponse,
  QuotationFile,
  QuotationsParams
} from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  sortActives: Subject<null> = new Subject();
  refreshQuotation: Subject<null> = new Subject();
  showStepper: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) {}

  createQuotation(quotation: Partial<Quotation>): Observable<Quotation> {
    return this.httpClient.post<Quotation>(`${environment.QUOTATION}`, quotation);
  }

  createQuotationWithInfo(quotation: Partial<Quotation>): Observable<Quotation> {
    return this.httpClient.post<Quotation>(`${environment.QUOTATION}`, quotation);
  }

  getAllQuotationsWithParams(params?: QuotationsParams): Observable<Quotation[]> {
    return this.httpClient.get<Quotation[]>(`${environment.QUOTATIONS}`, {
      params: httpParamsScraper(params)
    });
  }

  getAllOffersByQuotationId(quotationId?: string): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(`${environment.QUOTATION}${quotationId}/offers/`);
  }

  getAllOffersFilteredStatus(quotationId: string, status?: OfferStatus[]): Observable<Offer[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status.join(','));
    }

    return this.httpClient.get<Offer[]>(`${environment.QUOTATION}${quotationId}/offers/`, { params });
  }

  putQuotation(quotationId: string = '', sendEmailWithPrice: boolean = false): Observable<Quotation> {
    return this.httpClient.put<Quotation>(`${environment.QUOTATION}${quotationId}/`, { sendEmailWithPrice });
  }

  showNextStep(step: boolean): void {
    this.showStepper.next(step);
  }

  getExcelByQuotationId(quotationId: string): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.QUOTATION}${quotationId}/excel`, {
        responseType: 'base64' as 'json',
        observe: 'response'
      })
      .pipe(map((response) => response.body));
  }

  exportQuotations(): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.QUOTATIONS}excel`, {
        responseType: 'base64' as 'json',
        observe: 'response'
      })
      .pipe(map((response) => response.body));
  }

  cancelQuotation(quotationId: string, justification: string): Observable<QuotationCancelResponse> {
    const body = { justification };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { body, headers };

    return this.httpClient.delete<QuotationCancelResponse>(`${environment.QUOTATION}${quotationId}/`, options);
  }

  saveQuotationFile(file: string, filename: string): Observable<QuotationFile> {
    return this.httpClient.post<QuotationFile>(`${environment.QUOTATION}files`, { file, filename });
  }

  getQuotationFileData(quotationId: string, quotationFileId: string): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.QUOTATION}${quotationId}/files/${quotationFileId}`, {
        responseType: 'base64' as 'json',
        observe: 'response'
      })
      .pipe(map((response) => response.body));
  }

  removeQuotationFile(quotationId: string, quotationFileId: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.QUOTATION}${quotationId}/files/${quotationFileId}`);
  }
}
