import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Authentication } from '../interfaces/authentication.interface';
import { ChangePasswordLgpd } from '../interfaces/change-password.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { TokenDecoded } from '../interfaces/token-decoded.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  authenticate(credentials: Credentials): Observable<Authentication> {
    return this.httpClient.post<Authentication>(
      `${environment.LOGIN}`,
      credentials
    );
  }

  authenticateTokenHud(token: string): Observable<Authentication> {
    return this.httpClient.post<Authentication>(
      `${environment.LOGIN_TOKEN_HUD}`, { token: token }
    );
  }

  changePassword(params: ChangePasswordLgpd): Observable<Authentication> {
    return this.httpClient.put<Authentication>(`${environment.BACKOFFICE}/user/password/`, params);
  }

  tokenVerify(token: string): boolean {
    try {
      const { exp } = jwtDecode(token) as TokenDecoded;
      return new Date() < new Date(exp * 1000);
    } catch (e) {
      return false;
    }
  }

  sendRecoveryEmail(email: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${environment.BACKOFFICE}/user_no_auth/recovery_password/`,
      { email }
    );
  }
}
