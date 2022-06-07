import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BillingInfoService, CreateBillingInfo } from '@energy-contracting';
import { EsferaNotificationsModule, NotificationsService } from '@esferaenergia/esfera-ui';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { Observable, of, throwError } from 'rxjs';
import { createBillingInfoFixture } from '../../fixture/create-billing-info.fixture';
import { BillingInfoEditComponent } from './billing-info-edit.component';

const billingInfoServiceStub: Partial<BillingInfoService> = {
  getBillingInfoById: (id: string): Observable<CreateBillingInfo> => of(),
  editBillingInfo: (billingInfo: CreateBillingInfo, billingInfoId: string): Observable<CreateBillingInfo> => of()
};

const bankServiceStub: Partial<BankService> = {
  getBanks: (query?: string, pagination?: Pagination): Observable<Bank[]> => of()
};

const notificationsServiceStub = {
  error: (message: string, dismissTime?: number): Notification => null,
  success: (message: string, dismissTime?: number): Notification => null
};

const dialogRefStub: Partial<MatDialogRef<any>> = {
  close: (dialogResult?: any) => {}
};

describe('BillingInfoEditComponent', () => {
  let component: BillingInfoEditComponent;
  let fixture: ComponentFixture<BillingInfoEditComponent>;
  let billingInfoService: BillingInfoService;
  let bankService: BankService;
  let notificationsService: NotificationsService;
  let formBuilder: FormBuilder;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BillingInfoEditComponent, CreateBillingInfoComponent, AddressComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          MatAutocompleteModule,
          NgxsModule.forRoot(),
          MatDialogModule,
          EsferaNotificationsModule,
          NgxMaskModule.forRoot(),
          NoopAnimationsModule
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogRefStub },
          { provide: BillingInfoService, useValue: billingInfoServiceStub },
          { provide: BankService, useValue: bankServiceStub },
          { provide: NotificationsService, useValue: notificationsServiceStub }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoEditComponent);
    component = fixture.componentInstance;
    billingInfoService = TestBed.inject(BillingInfoService);
    bankService = TestBed.inject(BankService);
    notificationsService = TestBed.inject(NotificationsService);
    formBuilder = TestBed.inject(FormBuilder);

    component.billingInfoId = 'test';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method get billing info', () => {
    const getBillingInfoByIdSpy = spyOn(component, 'getBillingInfoById').and.stub();

    component.ngAfterViewInit();

    expect(getBillingInfoByIdSpy).toHaveBeenCalled();
  });

  describe('getBillingInfoById', () => {
    it('should load billing info', fakeAsync(() => {
      component.isLoading.getBillingInfoById = true;
      component.billingInformation = new FormControl({ value: null, disabled: false });

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
      expect(component.isLoading.getBillingInfoById).toBeFalse();
    }));

    it('should push error message sended by backend', () => {
      const error = {
        error: {
          message: 'Test'
        }
      };

      component.isLoading.getBillingInfoById = true;
      component.billingInformation = new FormControl({ value: null, disabled: false });
      component.dialogRef = {
        close(dialogResult?: any) {}
      } as MatDialogRef<any>;

      const errorSpy = spyOn(notificationsService, 'error').and.stub();
      const getBillingInfoByIdSpy = spyOn(billingInfoService, 'getBillingInfoById').and.returnValue(throwError(error));

      component.getBillingInfoById();

      expect(getBillingInfoByIdSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Test');
      expect(component.isLoading.getBillingInfoById).toBeFalse();
    });

    it('should push error message', () => {
      const error = {
        error: {}
      };

      component.isLoading.getBillingInfoById = true;
      component.billingInformation = new FormControl({ value: null, disabled: false });
      component.dialogRef = {
        close(dialogResult?: any) {}
      } as MatDialogRef<any>;

      const getBillingInfoByIdSpy = spyOn(billingInfoService, 'getBillingInfoById').and.returnValue(throwError(error));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.getBillingInfoById();

      expect(getBillingInfoByIdSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Ops ocorreu algum erro, tente novamente mais tarde!');
      expect(component.isLoading.getBillingInfoById).toBeFalse();
    });
  });

  it('should submit billing info data', () => {
    const dialogRef = {
      close(dialogResult?: any) {}
    } as MatDialogRef<any>;

    component.dialogRef = dialogRef;
    component.isLoading.submit = true;

    const prepareBillingInfoDataSpy = spyOn(component, 'prepareBillingInfoData').and.returnValue(
      createBillingInfoFixture
    );
    const editBillingInfoSpy = spyOn(billingInfoService, 'editBillingInfo').and.returnValue(
      of(createBillingInfoFixture)
    );
    const successSpy = spyOn(notificationsService, 'success').and.stub();
    const closeSpy = spyOn(component.dialogRef, 'close').and.stub();

    component.editBillingInfo();

    expect(prepareBillingInfoDataSpy).toHaveBeenCalled();
    expect(editBillingInfoSpy).toHaveBeenCalledWith(createBillingInfoFixture, 'test');
    expect(successSpy).toHaveBeenCalledWith('Informações de faturamento cadastrada!');
    expect(closeSpy).toHaveBeenCalledWith(true);
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

      component.isLoading.getBillingInfoById = true;

      const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(throwError({ error }));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.loadBank(compe);

      fixture.changeDetectorRef.detectChanges();

      flush();

      expect(getBanksSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(error.message);
      expect(component.isLoading.getBillingInfoById).toBeFalse();
    }));

    it('should push generic error message', fakeAsync(() => {
      const compe = banksFixture[0].compe;

      component.isLoading.getBillingInfoById = true;

      const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(throwError({}));
      const errorSpy = spyOn(notificationsService, 'error').and.stub();

      component.loadBank(compe);

      fixture.changeDetectorRef.detectChanges();

      flush();

      expect(getBanksSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('Ops ocorreu algum erro, tente novamente mais tarde!');
      expect(component.isLoading.getBillingInfoById).toBeFalse();
    }));
  });
});
