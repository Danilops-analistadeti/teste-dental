import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Bank } from '../interfaces/bank.interface';
import { Pagination } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient) {}

  getBanks(query?: string, pagination?: Pagination): Observable<Bank[]> {
    let params = new HttpParams();
    if (query) {
      params = params.append('query', query);
    }

    if (pagination) {
      for (const key of Object.keys(pagination)) {
        const value = pagination[key];
        params = params.append(key, value);
      }
    }

    return this.http.get<Bank[]>(`${environment.ENV_PATH}/banks/`, { params });
  }
}
