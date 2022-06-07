import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { banksFixture } from '../fixture/banks.fixture';
import { BankService } from './bank.service';

describe('BankService', () => {
  let service: BankService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BankService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request banks', () => {
    service.getBanks().subscribe({
      next: (value) => expect(value).toEqual(banksFixture)
    });

    const request = httpMock.expectOne(`${environment.ENV_PATH}/banks/`, 'GET');
    request.flush(banksFixture);
  });

  it('should request banks with params', () => {
    service.getBanks('test', { page: 1, itemsPerPage: 10 }).subscribe({
      next: (value) => expect(value).toEqual(banksFixture)
    });

    const request = httpMock.expectOne(`${environment.ENV_PATH}/banks/?query=test&page=1&itemsPerPage=10`, 'GET');
    request.flush(banksFixture);
  });
});
