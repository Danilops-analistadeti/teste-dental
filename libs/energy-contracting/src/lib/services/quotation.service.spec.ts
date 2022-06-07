import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { QuotationCancelResponse } from '../interfaces/quotation-cancel-response.interface';
import { QuotationService } from './quotation.service';

describe('QuotationService', () => {
  let service: QuotationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuotationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request cancelQuotation', () => {
    const id = 'test';
    const justification = 'test';
    const response: QuotationCancelResponse = { id };

    service.cancelQuotation(id, justification).subscribe({
      next: (value) => expect(value).toEqual(response)
    });

    const req = httpMock.expectOne(`${environment.QUOTATION}${id}/`);
    req.flush(response);
  });
});
