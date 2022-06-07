import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GeneralData } from '../interfaces/general-data.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralDataService {
  constructor(private http: HttpClient) {}

  getGeneralData(): Observable<GeneralData> {
    return this.http.get<GeneralData>(`${environment.COMPANY}/`);
  }
}
