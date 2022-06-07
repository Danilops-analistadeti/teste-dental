import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { FinancialGuarantee } from '../interfaces/financial-guarantee.interface';

@Injectable({
  providedIn: 'root',
})
export class FinancialsGuaranteeService {
  constructor(private httpClient: HttpClient) {}

  getFinancialsGuarantee(): Observable<FinancialGuarantee[]> {
    return this.httpClient.get<FinancialGuarantee[]>(
      `${environment.ENV_PATH}/financials_guarantee/`
    );
  }
}
