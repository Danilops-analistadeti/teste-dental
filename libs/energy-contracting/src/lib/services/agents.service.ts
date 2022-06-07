import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Agents } from '../interfaces/agents.interface';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  constructor(private httpClient: HttpClient) { }

  getAgents(
    page?: number,
    itemsPerPage?: number,
    query?: string,
    orderBy = 'name'
  ): Observable<Agents[]> {
    let params: HttpParams = new HttpParams().append('orderBy', orderBy);

    if (query) {
      params = params.append('query', query);
    }

    if (page) {
      params = params.append('page', page.toString());
    }

    if (itemsPerPage) {
      params = params.append('itemsPerPage', itemsPerPage.toString());
    }

    return this.httpClient.get<Agents[]>(environment.AGENTS, { params });
  }

  getAgentsCount(): Observable<string> {
    return this.httpClient
      .head<Agents[]>(environment.AGENTS, { observe: 'response' })
      .pipe(map((res) => res.headers.get('x-total-count')));
  }

  getAgentsCCEE(value?: string): Observable<Agents[]> {
    let params: HttpParams = new HttpParams();
    if (value) {
      params = params.append('name', value);
    }

    return this.httpClient.get<Agents[]>(
      `${environment.BACKOFFICE}/ccee_agents/`,
      { params }
    );
  }

  getAgentsExcel(): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.AGENTS}excel`, {
        responseType: 'base64' as 'json',
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  getAgentsPdf(id: string): Observable<string> {
    return this.httpClient
      .get<string>(`${environment.ENV_PATH}/agent/${id}/registration_form`, {
        responseType: 'base64' as 'json',
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }
}
