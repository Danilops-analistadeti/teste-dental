import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PreRegistration } from '../interfaces/pre-registration.interface';

@Injectable({
  providedIn: 'root',
})
export class PreRegistrationService {
  constructor(private httpClient: HttpClient) {}

  preRegistration(
    preRegistration: PreRegistration
  ): Observable<PreRegistration> {
    return this.httpClient.post<PreRegistration>(
      `${environment.BACKOFFICE}/company_pre_registration/`,
      preRegistration
    );
  }
}
