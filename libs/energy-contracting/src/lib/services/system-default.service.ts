import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DefaultDate } from '../interfaces/default-date.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemDefaultService {
  constructor(private httpClient: HttpClient) {}

  getDefaultDates(): Observable<DefaultDate> {
    return this.httpClient.get<DefaultDate>(environment.DEFAULT_DATE);
  }
}
