import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync, } from "@angular/core/testing";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators, } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, } from "@angular/material/autocomplete";
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EsferaLoadingModule } from "@esferaenergia/esfera-ui";
import { NotificationsService } from "@esferaenergia/esfera-ui/";
import { NgxsModule, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { billingInfoFixture } from "../../modules/billing-info/fixture/billing-info.fixture";
import { createBillingInfoFixture } from "../../modules/billing-info/fixture/create-billing-info.fixture";
import { BillingInfoService } from "../../modules/billing-info/services/billing-info.service";
import { AddressComponent } from "../address/address.component";
import { banksFixture } from "../fixture/banks.fixture";
import { clientFixture } from "../fixture/client.fixture";
import { Bank } from "../interfaces/bank.interface";
import { BillingInfo } from "../interfaces/billing-info.interface";
import { ClientBillingInfo } from "../interfaces/client-billing-info.interface";
import { Client } from "../interfaces/client.interface";
import { CompanyAddressData } from "../interfaces/company-billing-data.interface";
import { Pagination } from "../interfaces/pagination.interface";
import { BankService } from "../services/bank.service";
import { ClientsService } from "../services/clients.service";
import { preloadBanksPagination } from "./constants/preload-banks-pagination.constant";
import { preloadClientsPagination } from "./constants/preload-clients-pagination.constant";
import { CreateBillingInfoComponent } from "./create-billing-info.component";
import { CreateBillingInfo } from "./interfaces/create-billing-info.interface";

const billingServiceStub: Partial<BillingInfoService> = {
  createBillingInfo: (billingInfo: CreateBillingInfo): Observable<BillingInfo> => of(null),
  getCompanyAddressData: (cnpj: string): Observable<CompanyAddressData> => of(null)
};

const notificationsServiceStub: Partial<NotificationsService> = {
  success: (message: string, dismissTime?: number): any => null,
};

const dialogRefStub: Partial<MatDialogRef<any>> = {
  close: (dialogResult?: any) => {
  },
};

const storeStub = {
  selectSnapshot: (selector: (state: any, ...states: any[]) => any): any => {
  }
};

const bankServiceStub: Partial<BankService> = {
  getBanks: (query?: string, pagination?: Pagination): Observable<Bank[]> => of(null),
}

describe('CreateBillingInfoComponent', () => {
  let component: CreateBillingInfoComponent;
  let fixture: ComponentFixture<CreateBillingInfoComponent>;
  let clientService: ClientsService;
  let billingInfoService: BillingInfoService;
  let notificationService: NotificationsService;
  let formBuilder: FormBuilder;
  let store: Store;
  let bankService: BankService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CreateBillingInfoComponent, AddressComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatChipsModule,
          MatAutocompleteModule,
          EsferaLoadingModule,
          NoopAnimationsModule,
          NgxsModule.forRoot(),
        ],
        providers: [
          ClientsService,
          { provide: MatDialogRef, useValue: dialogRefStub },
          { provide: NotificationsService, useValue: notificationsServiceStub },
          { provide: BillingInfoService, useValue: billingServiceStub },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: Store, useValue: storeStub },
          { provide: BankService, useValue: bankServiceStub }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillingInfoComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientsService);
    billingInfoService = TestBed.inject(BillingInfoService);
    notificationService = TestBed.inject(NotificationsService);
    formBuilder = TestBed.inject(FormBuilder);
    store = TestBed.inject(Store);
    bankService = TestBed.inject(BankService);

    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should fill company when has selected clients on after view init', () => {
    const client: Client = {
      id: 'test',
      name: 'test',
    };

    component.billingInformationForm = formBuilder.group({ company: new FormControl() });
    component.selectedClients = client;

    component.ngAfterViewInit();

    expect(component.billingInformationForm.get('company').value).toEqual(client);
  });

  describe('writeValue', () => {
    it('should disable emails, bank and client controls', () => {
      const form = formBuilder.group({
        title: new FormControl(createBillingInfoFixture.title, Validators.required),
        name: new FormControl(createBillingInfoFixture.name, Validators.required),
        cnpj: new FormControl(createBillingInfoFixture.cnpj, Validators.required),
        emails: new FormControl(createBillingInfoFixture.emails, Validators.email),
        bank: new FormControl(createBillingInfoFixture.bank),
        agency: new FormControl(createBillingInfoFixture.agency),
        accountNumber: new FormControl(createBillingInfoFixture.accountNumber),
        phone: new FormControl(createBillingInfoFixture.phone),
        stateRecord: new FormControl(createBillingInfoFixture.stateRecord),
        company: new FormControl(createBillingInfoFixture.company, Validators.required),
        address: new FormControl(createBillingInfoFixture.address),
      });

      component.showActions = false;
      component.buildForm();
      component.banks = [];

      component.writeValue(form);

      expect(component.clientSearchControl.disabled).toBeTrue();
      expect(component.bankSearchControl.disabled).toBeTrue();
      expect(component.billingInformationForm.get('emails').disabled).toBeTrue();
    });

    it('should put values on form', () => {
      const bankMock: Bank = { compe: '007', shortName: 'test', longName: 'test long' };
      const form = formBuilder.group({
        title: new FormControl(createBillingInfoFixture.title, Validators.required),
        name: new FormControl(createBillingInfoFixture.name, Validators.required),
        cnpj: new FormControl(createBillingInfoFixture.cnpj, Validators.required),
        emails: new FormControl(createBillingInfoFixture.emails, Validators.email),
        bank: new FormControl(bankMock),
        agency: new FormControl(createBillingInfoFixture.agency),
        accountNumber: new FormControl(createBillingInfoFixture.accountNumber),
        phone: new FormControl(createBillingInfoFixture.phone),
        stateRecord: new FormControl(createBillingInfoFixture.stateRecord),
        company: new FormControl(createBillingInfoFixture.company, Validators.required),
        address: new FormControl(createBillingInfoFixture.address),
      });

      component.showActions = true;
      component.buildForm();
      component.banks = [bankMock];

      const onChangeSpy = spyOn(component, 'onChange').and.callThrough();
      const setValueBankSpy = spyOn(component.bankSearchControl, 'setValue').and.callFake(() => {
        component.billingInformationForm.get('bank').setValue(bankMock);
      });

      const setValueClientSpy = spyOn(component.clientSearchControl, 'setValue').and.callFake(() => {
        component.billingInformationForm.get('company').setValue(createBillingInfoFixture.company);
      });

      const patchValueSpy = spyOn(component.billingInformationForm, 'patchValue').and.callFake(() => {
        component.billingInformationForm.get('title').setValue(createBillingInfoFixture.title);
      });

      component.writeValue(form);

      expect(setValueClientSpy).toHaveBeenCalled();
      expect(setValueBankSpy).toHaveBeenCalledWith(bankMock);
      expect(patchValueSpy).toHaveBeenCalledWith(form);
      expect(onChangeSpy).toHaveBeenCalledWith(form);
      expect(component.billingInformationForm.get('title').value).toEqual(createBillingInfoFixture.title);
      expect(component.billingInformationForm.get('bank').value).toEqual(bankMock);
      expect(component.billingInformationForm.get('company').value).toEqual(createBillingInfoFixture.company);
    });
  });

  it('should call methods of oninit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();
    const createBillingInfoValueChangesSpy = spyOn(component, 'createBillingInfoValueChanges').and.stub();
    const preloadClientsSpy = spyOn(component, 'preloadClients').and.stub();
    const preloadBanksSpy = spyOn(component, 'preloadBanks').and.stub();
    const fillUserDataOnFormSpy = spyOn(component, 'fillUserDataOnForm').and.stub();
    const listenChangedClientSearchSpy = spyOn(component, 'listenChangedClientSearch').and.stub();
    const listenChangedBankSearchSpy = spyOn(component, 'listenChangedBankSearch').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
    expect(createBillingInfoValueChangesSpy).toHaveBeenCalled();
    expect(preloadClientsSpy).toHaveBeenCalled();
    expect(preloadBanksSpy).toHaveBeenCalled();
    expect(fillUserDataOnFormSpy).toHaveBeenCalled();
    expect(listenChangedClientSearchSpy).toHaveBeenCalled();
    expect(listenChangedBankSearchSpy).toHaveBeenCalled();
  });

  describe('createBillingInfo', () => {
    it('should request create method', () => {
      const prepareBillingInfoDataSpy = spyOn(component, 'prepareBillingInfoData').and.returnValue(createBillingInfoFixture);
      const createBillingInfoSpy = spyOn(billingInfoService, 'createBillingInfo').and.returnValue(of(billingInfoFixture[0]));

      component.createBillingInfo();

      expect(prepareBillingInfoDataSpy).toHaveBeenCalled();
      expect(createBillingInfoSpy).toHaveBeenCalledWith(createBillingInfoFixture);
    });

    it('should push success notification and close dialog', () => {
      const prepareBillingInfoDataSpy = spyOn(component, 'prepareBillingInfoData').and.returnValue(createBillingInfoFixture);
      const createBillingInfoSpy = spyOn(billingInfoService, 'createBillingInfo').and.returnValue(of(billingInfoFixture[0]));
      const successSpy = spyOn(notificationService, 'success').and.stub();
      const closeSpy = spyOn(component.dialogRef, 'close').and.stub();

      component.createBillingInfo();

      expect(prepareBillingInfoDataSpy).toHaveBeenCalled();
      expect(createBillingInfoSpy).toHaveBeenCalledWith(createBillingInfoFixture);
      expect(successSpy).toHaveBeenCalledWith('Informações de faturamento cadastrada');
      expect(closeSpy).toHaveBeenCalledWith(true);
    });
  });

  it('should build form', () => {
    const form = formBuilder.group({
      title: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      cnpj: new FormControl(null, Validators.required),
      stateRecord: new FormControl(null),
      bank: new FormControl(null),
      agency: new FormControl(null),
      accountNumber: new FormControl(null),
      emails: new FormControl(null, Validators.email),
      phone: new FormControl(null),
      company: new FormControl(null, Validators.required),
      address: new FormControl(),
      id: new FormControl(null),
    });

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(form);

    component.buildForm();

    expect(groupSpy).toHaveBeenCalled();
    expect(component.billingInformationForm).toEqual(form);
  });

  it('should prepare billing data', () => {
    component.billingInformationForm = formBuilder.group({
      title: new FormControl(''),
      name: new FormControl(''),
      cnpj: new FormControl(''),
      stateRecord: new FormControl(''),
      bank: new FormControl(''),
      agency: new FormControl(''),
      accountNumber: new FormControl(''),
      emails: new FormControl(['']),
      phone: new FormControl(''),
      company: new FormControl(''),
      address: formBuilder.group({
        city: new FormControl(''),
        complement: new FormControl(''),
        neighborhood: new FormControl(''),
        number: new FormControl(''),
        postalCode: new FormControl(''),
        street: new FormControl(''),
        state: new FormControl('')
      }),
    });

    const billingData = component.prepareBillingInfoData();

    expect(billingData).toEqual(createBillingInfoFixture);
  });

  it('should request clients with param', () => {
    component.clients = [clientFixture, clientFixture];
    const query = 'test';

    const getClientsSpy = spyOn(clientService, 'getClients').and.returnValue(of([clientFixture]));

    component.changeClients(query);

    expect(getClientsSpy).toHaveBeenCalledWith(query);
    expect(component.clients).toEqual([clientFixture]);
  });

  it('should put email on list', () => {
    const email = 'test@email.com';
    const event = {
      input: {
        value: email,
      },
      value: `${email} `,
    };

    const pushSpy = spyOn(component.emails, 'push').and.callThrough();

    component.add(event as MatChipInputEvent);

    expect(pushSpy).toHaveBeenCalledWith(email);
    expect(component.emails[0]).toEqual(email);
    expect(event.input.value).toEqual('');
  });

  it('should remove email', () => {
    const email = 'test1@email.com';
    component.emails = [email, 'test2@email.com'];

    const indexOfSpy = spyOn(component.emails, 'indexOf').and.returnValue(0);
    const spliceSpy = spyOn(component.emails, 'splice').and.callThrough();

    component.remove(email);

    expect(indexOfSpy).toHaveBeenCalledWith(email);
    expect(spliceSpy).toHaveBeenCalledWith(0, 1);
    expect(component.emails.length).toEqual(1);
  });

  describe('invalidAddress', () => {
    it('should return valid', () => {
      component.billingInformationForm = formBuilder.group({
        address: new FormControl(null, Validators.required),
      });

      component.billingInformationForm.get('address').setValue({ invalid: false });

      expect(component.invalidAddress).toBeFalse();
    });

    it('should return invalid', () => {
      component.billingInformationForm = formBuilder.group({
        address: new FormControl(null, Validators.required),
      });

      expect(component.invalidAddress).toBeTrue();
    });
  });

  it('should preload clients', () => {
    const clientMock = [clientFixture];
    const getClientsSpy = spyOn(clientService, 'getClients').and.returnValue(of(clientMock));

    component.preloadClients();

    expect(getClientsSpy).toHaveBeenCalledWith(undefined, preloadClientsPagination);
    expect(component.clients).toEqual(clientMock);
  });

  it('should preload banks', () => {
    const getBanksSpy = spyOn(bankService, 'getBanks').and.returnValue(of(banksFixture));

    component.preloadBanks();

    expect(getBanksSpy).toHaveBeenCalledWith(undefined, preloadBanksPagination);
    expect(component.banks).toEqual(banksFixture);
  });

  it('should return name of client', () => {
    const name = 'test';
    const client: Client = {
      name,
      id: ''
    };

    const result = component.displayFnClient(client);

    expect(result).toEqual(name);
  });

  it('should return client presentation', () => {
    const clientPresentation = component.displayFnClient({ name: 'test' } as Client);
    expect(clientPresentation).toEqual('test');
  });

  it('should return bank presentation', () => {
    const bankPresentation = component.displayFnBank(banksFixture[0]);
    expect(bankPresentation).toEqual('007 - test');
  });

  it('should fill form with company data and call method searchCompanyAddress', () => {
    const autoCompleteOption = {
      option: {
        value: {
          id: 'test',
          cnpj: '123'
        }
      }
    };

    component.billingInformationForm = formBuilder.group({
      company: new FormControl(),
      cnpj: new FormControl()
    });

    const searchCompanyBillingDataSpy = spyOn(component, 'searchCompanyAddress').and.stub();

    component.onSelectedClient(autoCompleteOption as MatAutocompleteSelectedEvent);

    expect(component.billingInformationForm.get('company').value).toEqual(autoCompleteOption.option.value.id);
    expect(component.billingInformationForm.get('cnpj').value).toEqual(autoCompleteOption.option.value.cnpj);
    expect(searchCompanyBillingDataSpy).toHaveBeenCalled();
  });

  describe('searchCompanyAddress', () => {
    it('should search company address', () => {
      const cnpjMock = '123';
      const companyAddressMock: CompanyAddressData = {
        cnpj: '',
        name: '',
        city: '',
        neighborhood: '',
        postalCode: '',
        stateRecord: '',
        street: '',
        number: '',
        complement: '',
      };

      const clientBillingInfoDataMock = {
        cnpj: '',
        name: '',
        address: {
          city: '',
          complement: '',
          neighborhood: '',
          number: '',
          postalCode: '',
          street: '',
          state: ''
        }
      };

      component.billingInformationForm = formBuilder.group({
        cnpj: new FormControl(cnpjMock)
      });

      const patchCompanyAddressValuesSpy = spyOn(component, 'patchCompanyAddressValues').and.stub();
      const getCompanyAddressDataSpy = spyOn(billingInfoService, 'getCompanyAddressData').and
        .returnValue(of(companyAddressMock));
      const transformCompanyAddressToDataFormSpy = spyOn(component, 'transformCompanyAddressToDataForm').and
        .returnValue(clientBillingInfoDataMock);

      component.searchCompanyAddress();

      expect(getCompanyAddressDataSpy).toHaveBeenCalledWith(cnpjMock);
      expect(transformCompanyAddressToDataFormSpy).toHaveBeenCalledWith(companyAddressMock);
      expect(patchCompanyAddressValuesSpy).toHaveBeenCalledWith(clientBillingInfoDataMock);
    });

    it('should cancel method', () => {
      component.billingInformationForm = formBuilder.group({
        cnpj: new FormControl('')
      });

      const getCompanyAddressDataSpy = spyOn(billingInfoService, 'getCompanyAddressData').and.stub();

      component.searchCompanyAddress();

      expect(getCompanyAddressDataSpy).not.toHaveBeenCalled();
    });
  });

  it('should transform company address in data form', () => {
    const companyAddressMock: CompanyAddressData = {
      cnpj: '',
      name: '',
      city: '',
      neighborhood: '',
      postalCode: '',
      stateRecord: '',
      street: '',
      number: '',
      complement: '',
    };

    const expectedFormData = {
      cnpj: '',
      name: '',
      address: {
        city: '',
        complement: '',
        neighborhood: '',
        number: '',
        postalCode: '',
        street: '',
        state: ''
      }
    };

    const result = component.transformCompanyAddressToDataForm(companyAddressMock);

    expect(result).toEqual(expectedFormData);
  });

  it('should put client data on form', () => {
    const name = 'Test Company';
    const data: Partial<ClientBillingInfo> = {
      name
    };

    component.billingInformationForm = formBuilder.group({
      name: new FormControl([]),
    });

    const clearFormForFillFieldsSpy = spyOn(component, 'clearFormForFillFields').and.stub();

    component.patchCompanyAddressValues(data as ClientBillingInfo);

    expect(clearFormForFillFieldsSpy).toHaveBeenCalled();
    expect(component.billingInformationForm.get('name').value).toEqual(name);
  });

  describe('listenChangedClientSearch', () => {
    it('should call changeClients', fakeAsync(() => {
      const value = 'test';

      const changeClientsSpy = spyOn(component, 'changeClients').and.stub();

      component.listenChangedClientSearch();

      component.clientSearchControl.setValue(value);

      tick(500);

      expect(changeClientsSpy).toHaveBeenCalledWith(value);
    }));

    it('should dont call changeClients when data is object', fakeAsync(() => {
      const value = {};

      const changeClientsSpy = spyOn(component, 'changeClients').and.stub();

      component.listenChangedClientSearch();

      component.clientSearchControl.setValue(value);

      tick(500);

      expect(changeClientsSpy).not.toHaveBeenCalled();
    }));
  });
  describe('listenChangedBankSearch', () => {
    it('should call changeBanks', fakeAsync(() => {
      const value = 'test';

      const changeBanksSpy = spyOn(component, 'changeBanks').and.stub();

      component.listenChangedBankSearch();

      component.bankSearchControl.setValue(value);

      tick(500);

      expect(changeBanksSpy).toHaveBeenCalledWith(value);
    }));

    it('should dont call changeBanks when data is object', fakeAsync(() => {
      const value = {};

      const changeBanksSpy = spyOn(component, 'changeBanks').and.stub();

      component.listenChangedBankSearch();

      component.bankSearchControl.setValue(value);

      tick(500);

      expect(changeBanksSpy).not.toHaveBeenCalled();
    }));
  });

  it('should clear form and set value title', () => {
    component.billingInformationForm = formBuilder.group({
      title: new FormControl('test'),
      name: new FormControl('test')
    });

    component.clearFormForFillFields();

    expect(component.billingInformationForm.get('title').value).toEqual('test');
    expect(component.billingInformationForm.get('name').value).toEqual(null);
  });

  it('should return the id of ClientInfoData', () => {
    const client: Client = {
      id: '95fee683-a507-4356-9348-9fdc8769ee2a',
      name: 'test'
    };

    const id = component.trackByFnClient(client);

    expect(id).toEqual(client.id);
  });

  it('should return email', () => {
    const email = 'test@email.com';

    const result = component.trackByFnEmail(email);
    expect(result).toEqual(email);
  });

  it('should return bank', () => {
    const result = component.trackByFnBank(banksFixture[0]);
    expect(result).toEqual('007');
  });

  it('should put bank selected on form', () => {
    const autoCompleteOption = {
      option: {
        value: banksFixture[0]
      }
    };

    component.billingInformationForm = formBuilder.group({
      bank: new FormControl(),
    });

    component.onSelectBank(autoCompleteOption as MatAutocompleteSelectedEvent);

    expect(component.billingInformationForm.get('bank').value).toEqual('007');
  });
});
