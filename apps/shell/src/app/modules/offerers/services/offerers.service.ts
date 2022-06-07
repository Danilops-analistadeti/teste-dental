import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferersService {
  constructor(private httpClient: HttpClient) {}

  downloadOffersService() {
    return this.httpClient.get(`${environment.OFFER}`);
  }
}
