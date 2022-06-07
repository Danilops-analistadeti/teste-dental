import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyAddressData } from 'projects/energy-contracting/src/lib/interfaces/company-billing-data.interface';
import { environment } from "../../../../../src/environments/environment";
import { billingInfoFixture } from "../../../../../src/app/modules/billing-info/fixture/billing-info.fixture";
import { createBillingInfoFixture } from "../../../../../src/app/modules/billing-info/fixture/create-billing-info.fixture";
import { BillingInfoService } from './billing-info.service';

const billingInfoMock = billingInfoFixture[0];
const createBillingInfoMock = createBillingInfoFixture;

describe('BillingInfoService', () => {
  let service: BillingInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(BillingInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request get billing info with id', () => {
    const id = 'fa224889-60de-47ac-8e3a-4df178e6a776';

    service.getBillingInfoById(id).subscribe({
      next: value => expect(value).toEqual(createBillingInfoMock)
    });

    const req = httpMock.expectOne(`${environment.BILLING_INFO}/${id}/`);
    req.flush(createBillingInfoMock);
  });

  it('should request get billing info with company id', () => {
    const clientId = '73a028de-95ea-45ac-86bc-9dbd4056c66f';

    service.billingInfoGetByIdCompany(clientId).subscribe({
      next: value => expect(value).toEqual(billingInfoFixture)
    });

    const req = httpMock.expectOne(`${environment.ENV_PATH}/client/${clientId}/billing_infos/`)
    req.flush(billingInfoFixture);
  });

  it('should request create billing info', () => {
    service.createBillingInfo(createBillingInfoFixture).subscribe({
      next: value => expect(value).toEqual(billingInfoMock)
    });

    const req = httpMock.expectOne(`${environment.BILLING_INFO}/`);
    req.flush(billingInfoMock);
  });

  it('should request edit billing info', () => {
    const billingInfoId = billingInfoMock.id;

    service.editBillingInfo(createBillingInfoMock, billingInfoId).subscribe({
      next: value => expect(value).toEqual(createBillingInfoMock)
    });

    const req = httpMock.expectOne(`${environment.BILLING_INFO}/${billingInfoId}/`)
    req.flush(createBillingInfoMock);
  });

  it('should request delete billing info', () => {
    const billingInfoId = billingInfoMock.id;

    service.deleteBillingInfo(billingInfoId).subscribe({
      next: value => expect(value).toEqual(billingInfoMock)
    });

    const req = httpMock.expectOne(`${environment.BILLING_INFO}/${billingInfoId}/`);
    req.flush(billingInfoMock);
  });

  it('should request get company billing data', () => {
    const cnpj = '1234546789';
    const companyBillingDataMock: CompanyAddressData = {
      cnpj,
      name: 'test',
      city: 'test',
      neighborhood: 'test',
      postalCode: 'test',
      stateRecord: 'test',
      street: 'test',
      number: 'test',
      complement: 'test',
    };

    service.getCompanyAddressData(cnpj).subscribe({
      next: value => expect(value).toEqual(companyBillingDataMock)
    });

    const req = httpMock.expectOne(`${environment.ENV_PATH}/company_by_receita_federal/${cnpj}/`);
    req.flush(companyBillingDataMock);
  });
});
