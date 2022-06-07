import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as sign from 'jwt-encode';
import { of } from 'rxjs';
import { environment } from '../../../../../src/environments/environment';
import { Authentication } from '../interfaces/authentication.interface';
import { ChangePasswordLgpd } from '../interfaces/change-password.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call authenticate and return authentication data', () => {
    const credentials: Credentials = {
      email: 'test@email.com',
      password: 'test',
      application: 'APP'
    };

    const authenticatedUserMock: Authentication = {
      id: '',
      name: '',
      email: credentials.email,
      roles: []
    };

    service.authenticate(credentials).subscribe({
      next: (data) => expect(data).toEqual(authenticatedUserMock)
    });

    const req = httpMock.expectOne(`${environment.LOGIN}`);
    req.flush(authenticatedUserMock);
  });

  it('should call changePassword and return authentication data', () => {
    const authenticatedUserMock: Authentication = {
      id: '',
      name: '',
      email: '',
      roles: []
    };

    const params: ChangePasswordLgpd = {
      password: 'test',
      contracts: ['privacy-contract']
    };

    service.changePassword(params).subscribe({
      next: (data) => expect(data).toEqual(authenticatedUserMock)
    });

    const req = httpMock.expectOne(`${environment.BACKOFFICE}/user/password/`);
    req.flush(authenticatedUserMock);
  });

  describe('tokenVerify', () => {
    it('should return true', () => {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      const data = {
        exp: now.getTime()
      };

      const token = sign(data, '');

      const returnValue = service.tokenVerify(token);

      expect(returnValue).toBeTrue();
    });

    it('should return false', () => {
      const now = new Date();
      now.setDate(now.getDate() - 1);
      const data = {
        exp: now.getTime()
      };

      const token = sign(data, '');

      const returnValue = service.tokenVerify(token);

      expect(returnValue).toBeTrue();
    });
  });

  it('should send recovery email request', () => {
    service.sendRecoveryEmail('test@email.com').subscribe({
      next: (value) => expect(value).toBeDefined(),
    });

    const req = httpMock.expectOne(`${environment.BACKOFFICE}/user_no_auth/recovery_password/`);
    req.flush(of(true));
  });
});
