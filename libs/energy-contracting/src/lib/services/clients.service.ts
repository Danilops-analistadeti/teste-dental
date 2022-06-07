import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BillingInfo } from '../../public-api';
import { Client } from '../interfaces/client.interface';
import { Pagination } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpClient: HttpClient) { }

  getClients(name?: string, pagination?: Pagination, orderBy = 'name'): Observable<Client[]> {
    let params = new HttpParams().append('orderBy', orderBy);

    if (name) {
      params = params.append('name', name);
    }

    if (pagination) {
      for (const key of Object.keys(pagination)) {
        const value = pagination[key];
        params = params.append(key, value);
      }
    }

    return this.httpClient.get<Client[]>(`${environment.CLIENTS}`, { params });
  }

  getBillingInfoByCompanyId(clientId: string, orderBy = 'name'): Observable<BillingInfo[]> {
    const params = new HttpParams().append('orderBy', orderBy);

    return this.httpClient.get<BillingInfo[]>(
      `${environment.ENV_PATH}/client/${clientId}/billing_infos/`, { params }
    );
  }
}
