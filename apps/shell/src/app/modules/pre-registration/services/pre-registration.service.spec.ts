import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { PreRegistration } from '../interfaces/pre-registration.interface';
import { PreRegistrationService } from './pre-registration.service';

describe('PreRegistrationService', () => {
  let service: PreRegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PreRegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be preRegistration', () => {
    const preResgistrationMock: PreRegistration = {
      agents: ['teste'],
      email: 'teste@gmail.com',
      name: 'teste',
      phone: '00000'
    };

    service.preRegistration(preResgistrationMock).subscribe({
      next: (user) => expect(user).toEqual(preResgistrationMock)
    });

    const req = httpMock.expectOne(`${environment.BACKOFFICE}/company_pre_registration/`);
    req.flush(preResgistrationMock);
  });
});
