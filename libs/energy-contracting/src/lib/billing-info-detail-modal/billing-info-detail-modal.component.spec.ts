import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { CreateBillingInfo } from 'projects/energy-contracting/src/lib/create-billing-info/interfaces/create-billing-info.interface';
import { banksFixture } from 'projects/energy-contracting/src/lib/fixture/banks.fixture';
import { Bank } from 'projects/energy-contracting/src/lib/interfaces/bank.interface';
import { BankService } from 'projects/energy-contracting/src/lib/services/bank.service';
import { Client, Pagination } from 'projects/energy-contracting/src/public-api';
import { Observable, of, throwError } from 'rxjs';
import { createBillingInfoFixture } from 'src/app/modules/billing-info/fixture/create-billing-info.fixture';
import { BillingInfoService } from '../services/billing-info.service';
import { BillingInfoDetailModalComponent } from './billing-info-detail-modal.component';

const billingInfoServiceStub: Partial<BillingInfoService> = {
  getBillingInfoById: (id: string): Observable<CreateBillingInfo> => of()
};

const bankServiceStub: Partial<BankService> = {
  getBanks: (query?: string, pagination?: Pagination): Observable<Bank[]> => of()
};

const notificationsServiceStub = {
  error: (message: string, dismissTime?: number): Notification => null
};

describe('BillingInfoDetailModalComponent', () => {
  let component: BillingInfoDetailModalComponent;
  let fixture: ComponentFixture<BillingInfoDetailModalComponent>;
  let billingInfoService: BillingInfoService;
  let bankService: BankService;
  let notificationsService: NotificationsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BillingInfoDetailModalComponent],
        imports: [HttpClientTestingModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: BillingInfoService, useValue: billingInfoServiceStub },
          { provide: BankService, useValue: bankServiceStub },
          { provide: NotificationsService, useValue: notificationsServiceStub }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoDetailModalComponent);
    component = fixture.componentInstance;
    billingInfoService = TestBed.inject(BillingInfoService);
    bankService = TestBed.inject(BankService);
    notificationsService = TestBed.inject(NotificationsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method get billing info', () => {
    const getBillingInfoByIdSpy = spyOn(component, 'getBillingInfoById').and.stub();

    component.ngOnInit();

    expect(getBillingInfoByIdSpy).toHaveBeenCalled();
  });

  describe('getBillingInfoById', () => {
    it('should load billing info', fakeAsync(() => {
      component.isLoading = true;
      component.billingInfoId = 'test';

      const getBillingInfoByIdSpy = spyOn(billingInfoService, 'getBillingInfoById').and.returnValue(
        of(createBillingInfoFixture)
      );
      const loadBankSpy = spyOn(component, 'loadBank').and.stub();
      const patchValueSpy = spyOn(component.billingInformation, 'patchValue').and.stub();

      component.getBillingInfoById();

      flush();

      expect(getBillingInfoByIdSpy).toHaveBeenCalledWith('test');
      expect(component.clients).toEqual([createBillingInfoFixture.company as Client]);
      expect(loadBankSpy).toHaveBeenCalledWith(createBillingInfoFixture.bank);
      expect(patchValueSpy).toHaveBeenCalledWith(createBillingInfoFixture);
      expect(component.isLoading).toBeFalse();
    }));

    it('should push error message sended by backend', () => {
      const error = {
        error: {
          message: 'Test'
        }
      };

      component.dialogRef = {
        close(dialogResult?: any) {}
      } as MatDialogRef<any>;

      const getBillingInfoByIdSpy = spyOn(billingInfoService, 'getBillingInfoById').and.returnValue(throwError(error));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.getBillingInfoById();

      expect(getBillingInfoByIdSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Test');
    });

    it('should push error message sended by backend', () => {
      const error = {
        error: {}
      };

      component.dialogRef = {
        close(dialogResult?: any) {}
      } as MatDialogRef<any>;

      const getBillingInfoByIdSpy = spyOn(billingInfoService, 'getBillingInfoById').and.returnValue(throwError(error));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.getBillingInfoById();

      expect(getBillingInfoByIdSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Ops ocorreu algum erro, tente novamente mais tarde!');
    });
  });

  describe('getBanks', () => {
    it('should get bank', fakeAsync(() => {
      const compe = banksFixture[0].compe;

      const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(of(banksFixture));

      component.loadBank(compe);

      flush();

      expect(getBanksSpy).toHaveBeenCalledWith(compe);
      expect(component.banks).toEqual(banksFixture);
    }));

    it('should push backend error message', fakeAsync(() => {
      const compe = banksFixture[0].compe;
      const error = {
        message: 'test'
      };

      component.isLoading = true;

      const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(throwError({ error }));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.loadBank(compe);

      flush();

      expect(getBanksSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('test');
      expect(component.isLoading).toBeFalse();
    }));

    it('should push generic error message', fakeAsync(() => {
      const compe = banksFixture[0].compe;

      component.isLoading = true;

      const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(throwError({}));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.loadBank(compe);

      flush();

      expect(getBanksSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Ops ocorreu algum erro, tente novamente mais tarde!');
      expect(component.isLoading).toBeFalse();
    }));
  });
});
