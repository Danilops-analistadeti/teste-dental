import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CompanyGroup } from '../interfaces/company-group.interface';
import { CompanyGroups } from '../interfaces/company-groups.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyGroupService {
  constructor(private httpClient: HttpClient) { }

  getCompanyGroups(orderBy = 'name'): Observable<CompanyGroups[]> {
    const params = new HttpParams().append('orderBy', orderBy);

    return this.httpClient.get<CompanyGroups[]>(environment.COMPANY_GROUPS, { params });
  }

  createCompanyGroups(companyGroups: CompanyGroup): Observable<CompanyGroup> {
    return this.httpClient.post<CompanyGroup>(
      environment.COMPANY_GROUP,
      companyGroups
    );
  }

  deleteCompanyGroups(id: string): Observable<CompanyGroup> {
    return this.httpClient.delete<CompanyGroup>(
      `${environment.COMPANY_GROUP}${id}/`
    );
  }

  getGroupById(id: string): Observable<CompanyGroup> {
    return this.httpClient.get<CompanyGroup>(`${environment.COMPANY_GROUP}${id}/`).pipe(map(response => {
      if (response?.companies?.length) {
        response.companies = response.companies.sort((a, b) => a.name < b.name ? -1 : 1);
      }
      return response;
    }));
  }

  putCompanyGroups(
    companyGroups: CompanyGroup,
    id: string
  ): Observable<CompanyGroup> {
    return this.httpClient.put<CompanyGroup>(
      `${environment.COMPANY_GROUP}${id}/`,
      companyGroups
    );
  }
}
