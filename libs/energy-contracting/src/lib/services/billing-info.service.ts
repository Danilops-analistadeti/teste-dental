import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BillingInfo, CreateBillingInfo } from '../../public-api';
import { CompanyAddressData } from '../interfaces/company-billing-data.interface';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {
  constructor(private httpClient: HttpClient) {}

  getBillingInfoById(id: string = ''): Observable<CreateBillingInfo> {
    return this.httpClient.get<CreateBillingInfo>(`${environment.BILLING_INFO}/${id}/`);
  }

  billingInfoGetByIdCompany(clientId: string): Observable<BillingInfo[]> {
    return this.httpClient.get<BillingInfo[]>(`${environment.ENV_PATH}/client/${clientId}/billing_infos/`);
  }

  createBillingInfo(billingInfo: CreateBillingInfo): Observable<BillingInfo> {
    return this.httpClient.post<BillingInfo>(`${environment.BILLING_INFO}/`, billingInfo);
  }

  editBillingInfo(billingInfo: CreateBillingInfo, billingInfoId: string): Observable<CreateBillingInfo> {
    return this.httpClient.put<CreateBillingInfo>(`${environment.BILLING_INFO}/${billingInfoId}/`, billingInfo);
  }

  deleteBillingInfo(id: string = ''): Observable<BillingInfo> {
    return this.httpClient.patch<BillingInfo>(`${environment.BILLING_INFO}/${id}/`, {});
  }

  getCompanyAddressData(cnpj: string): Observable<CompanyAddressData> {
    return this.httpClient.get<CompanyAddressData>(`${environment.ENV_PATH}/company_by_receita_federal/${cnpj}/`);
  }
}
