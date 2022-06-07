import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { EmailSended } from '../interfaces/email-sended.interface';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(private http: HttpClient) {}

  sendEmail(email: string): Observable<EmailSended> {
    return this.http.post<EmailSended>(`${environment.ENV_PATH}/invitation/`, {
      email,
    });
  }
}
