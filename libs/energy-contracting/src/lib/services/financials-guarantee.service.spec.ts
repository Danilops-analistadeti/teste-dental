import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FinancialsGuaranteeService } from './financials-guarantee.service';
import { environment } from 'projects/create-quotation/src/environments/environment';
import { FinancialGuarantee } from 'projects/energy-contracting/src/lib/interfaces/financial-guarantee.interface';


const financialGuaranteeMock: FinancialGuarantee =  {
  id: 'test',
  name: 'test',
  alias: 'test'
};

describe('FinancialsGuaranteeService', () => {
  let service: FinancialsGuaranteeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FinancialsGuaranteeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should return financials', () => {
    service.getFinancialsGuarantee().subscribe({
      next: value => expect(value).toEqual([financialGuaranteeMock])
    });

    const request = httpMock.expectOne(`${environment.ENV_PATH}`, 'GET');
    request.flush([financialGuaranteeMock]);
  });
});
