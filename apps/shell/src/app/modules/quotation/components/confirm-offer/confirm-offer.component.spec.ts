import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { quotationFixture, QuotationService, TransformMwhPipe } from 'projects/energy-contracting/src/public-api';
import { of, throwError } from 'rxjs';
import { ConfirmOfferComponent } from './confirm-offer.component';

const confirmProposalMock = {
  offerQuotation: quotationFixture,
  buttoName: 'TESTE',
  companyBuyer: 'teste',
  companySeller: 'teste',
  energyVolumeAverage: '1234',
  paymentBusinessDay: 1,
  price: 1234,
  priceType: '1234',
  proposalExpiration: new Date(),
  retusd: 1234,
  showRetusd: true,
  title: 'teste',
  offerId: 'teste'
};

describe('ConfirmOfferComponent', () => {
  let component: ConfirmOfferComponent;
  let fixture: ComponentFixture<ConfirmOfferComponent>;
  let quotationService: QuotationService;
  let notifications: NotificationsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmOfferComponent, TransformMwhPipe],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        TransformMwhPipe,
        {
          provide: QuotationService, useValue: {
            putQuotation: (quotationId: string, sendEmailWithPrice: boolean): void => { }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOfferComponent);
    component = fixture.componentInstance;
    quotationService = TestBed.inject(QuotationService);
    notifications = TestBed.inject(NotificationsService);

    component.data = confirmProposalMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be success change feed back', () => {
    const putQuotationSpy = spyOn(quotationService, 'putQuotation').and.returnValue(of(quotationFixture));
    const successSpy = spyOn(notifications, 'success');

    component.changeFeedback();

    expect(putQuotationSpy).
      toHaveBeenCalledWith(quotationFixture.id, confirmProposalMock.offerQuotation.sendEmailWithPrice);
    expect(successSpy).toHaveBeenCalledWith('Sucesso em alterar feedback');
  });

  it('should be error change feed back', () => {
    const putQuotationSpy = spyOn(quotationService, 'putQuotation').and.returnValue(throwError({}));
    const errorSpy = spyOn(notifications, 'error');

    component.changeFeedback();

    expect(putQuotationSpy).
      toHaveBeenCalledWith(quotationFixture.id, confirmProposalMock.offerQuotation.sendEmailWithPrice);
    expect(errorSpy).toHaveBeenCalledWith('Ops, aconteceu algum problema, tente novamente mais tarde!');
  });
});
