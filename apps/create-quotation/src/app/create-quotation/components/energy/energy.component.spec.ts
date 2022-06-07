import { DecimalPipe, KeyValue, KeyValuePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientsService, ConvertDecimalPipe, EnergySource, RoundingMwService } from '@energy-contracting';
import { of } from 'rxjs';
import { EnergyComponent } from './energy.component';

describe('EnergyComponent', () => {
  let component: EnergyComponent;
  let fixture: ComponentFixture<EnergyComponent>;
  let formBuilder: FormBuilder;
  let clientsService: ClientsService;
  let roundingMwService: RoundingMwService;
  let decimalPipe: DecimalPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ConvertDecimalPipe,
          useValue: {
            transform: (value: string | number, maxDecimals: string | number, isDecimal = false): void => { }
          }
        },
        {
          provide: ClientsService,
          useValue: {
            getClients: (name?: string, pagination?: Pagination) => { }
          }
        },
        {
          provide: KeyValuePipe, useValue: {
            transform<K extends number, V>(input: Record<K, V>, compareFn?: (a: KeyValue<string, V>, b: KeyValue<string, V>) => number): void { }
          }
        },
        {
          provide: DecimalPipe, useValue: {
            transform: (value: any, digitsInfo?: string, locale?: string): void => { }
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    clientsService = TestBed.inject(ClientsService);
    roundingMwService = TestBed.inject(RoundingMwService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();
    const onCreateFormChangeSpy = spyOn(component, 'onCreateFormChange').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
    expect(onCreateFormChangeSpy).toHaveBeenCalled();
  });

  it('should be setDisabledState', () => {
    const disableSpy = spyOn(component.createForm, 'disable').and.stub();

    component.setDisabledState(true);

    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable fields on setDisabledState', () => {
    const enableSpy = spyOn(component.createForm, 'enable').and.stub();

    component.setDisabledState(true);

    expect(enableSpy).toHaveBeenCalled();
  });

  it('should be validate retusd with SPECIAL INCETIVE FIFTY', () => {
    component.validateRetusd(EnergySource.SPECIAL_INCENTIVE_50);
    expect(component.createForm.get('retusd').value).toEqual('25');
  });

  it('should be validate retusd with QUALIFIED COGENERATION INCENTIVE FIFTY', () => {
    component.validateRetusd(EnergySource.QUALIFIED_COGENERATION_INCENTIVE_50);
    expect(component.createForm.get('retusd').value).toEqual('50');
  });

  it('should be validate retusd without ifs validations', () => {
    component.validateRetusd(EnergySource.CONVENTIONAL);
    expect(component.createForm.get('retusd').enable()).toBeTrue();
  });

  it('should be buildForm', () => {
    const formMock = formBuilder.group({
      ownerId: new FormControl('', Validators.required),
      quotationType: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      energyVolumeAverage: new FormControl('', Validators.required),
      energyVolumeHour: new FormControl('', Validators.required),
      energySource: new FormControl('', Validators.required),
      subMarketRegion: new FormControl('', Validators.required),
      retusd: new FormControl('', Validators.required),
      priceType: new FormControl('PLD', Validators.required)
    });

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(formMock);

    component.buildForm();

    expect(groupSpy).toHaveBeenCalled();
    expect(component.createForm).toEqual(formMock);
  });

  it('should be changeAgents', () => {
    const companyClientsMock: Client[] = [
      {
        id: 'teste',
        name: 'teste'
      }
    ];

    const getClientsSpy = spyOn(clientsService, 'getClients').and.returnValue(of(companyClientsMock));

    component.changeAgents('name');

    expect(component.loading.submit).toBeFalse();
    expect(component.companyClients).toEqual(companyClientsMock);
    expect(getClientsSpy).toHaveBeenCalled();
  });

  it('should be changeMwAverage', () => {
    const value = '123.4';

    const roundingMwhSpy = spyOn(roundingMwService, 'roundingMwh').and.returnValue(1234);
    const transformSpy = spyOn(decimalPipe, 'transform').and.returnValue(value);
    const startDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';
    const endDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';

    component.createForm = formBuilder.group({
      energyVolumeAverage: new FormControl(quotationFixture.ownerId),
      energyVolumeHour: new FormControl(quotationFixture.quotationType),
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate)
    });

    component.changeMwAverage();

    expect(roundingMwhSpy).toHaveBeenCalledWith('5f6e505dabc59806a16439bf', startDate, endDate);
    expect(transformSpy).toHaveBeenCalled();
    expect(component.createForm.get('energyVolumeHour').value).toEqual(value);
    expect(component.createForm.get('energyVolumeAverage').value).toEqual(value);
  });

  it('should be changeMwh', () => {
    const value = '123.4';

    const roundingMwAverage = spyOn(roundingMwService, 'roundingMwAverage').and.returnValue(1234);
    const transformSpy = spyOn(decimalPipe, 'transform').and.returnValue(value);
    const startDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';
    const endDate = 'Wed Jan 20 2021 13:00:26 GMT-0300';

    component.createForm = formBuilder.group({
      energyVolumeAverage: new FormControl(quotationFixture.ownerId),
      energyVolumeHour: new FormControl('1234'),
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate)
    });

    component.changeMwh();

    expect(roundingMwAverage).toHaveBeenCalledWith('1234', startDate, endDate);
    expect(transformSpy).toHaveBeenCalled();
    expect(component.createForm.get('energyVolumeHour').value).toEqual(value);
    expect(component.createForm.get('energyVolumeAverage').value).toEqual(value);
  });

  it('should be changeMwh but energyVolumeAverage value is null', () => {
    const roundingMwAverage = spyOn(roundingMwService, 'roundingMwAverage').and.stub();
    const transformSpy = spyOn(decimalPipe, 'transform').and.stub();

    component.createForm = formBuilder.group({
      energyVolumeAverage: new FormControl(),
    });

    component.changeMwAverage();

    expect(roundingMwAverage).not.toHaveBeenCalled();
    expect(transformSpy).not.toHaveBeenCalled();
  });

  it('should be changeMwh but energyVolumeControl value is null', () => {
    const roundingMwAverage = spyOn(roundingMwService, 'roundingMwAverage').and.stub();
    const transformSpy = spyOn(decimalPipe, 'transform').and.stub();

    component.createForm = formBuilder.group({
      energyVolume: new FormControl(),
    });

    component.changeMwh();

    expect(roundingMwAverage).not.toHaveBeenCalled();
    expect(transformSpy).not.toHaveBeenCalled();
  });

  it('should be preload agents', () => {
    const mockClients: Client[] = [{
      id: 'teste',
      name: 'teste'
    }];

    const getClientsSpy = spyOn(clientsService, 'getClients').and.returnValue(of(mockClients));

    component.preloadAgents();

    expect(component.companyClients).toEqual(mockClients);
    expect(getClientsSpy).toHaveBeenCalledWith(undefined, { itemsPerPage: 10, page: 1, orderBy: 'name' });
  });

  it('should be nextForm with form valid', () => {
    const emitSpy = spyOn(component.changedStep, 'emit');

    component.createForm = formBuilder.group({
      ownerId: []
    });

    component.nextForm();

    expect(emitSpy).toHaveBeenCalled();
  });


  it('should be nextForm with form invalid', () => {
    const emitSpy = spyOn(component.changedStep, 'emit');
    const markAllAsTouchedSpy = spyOn(component.createForm, 'markAllAsTouched');

    component.createForm = formBuilder.group({
      ownerId: []
    });

    component.nextForm();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should be fullReimbursement with checkbox true', () => {
    const retusdControl = component.createForm.get('retusd');

    const resetSpy = spyOn(retusdControl, 'reset');
    const clearValidatorsSpy = spyOn(retusdControl, 'clearValidators');
    const disableSpy = spyOn(retusdControl, 'disable');

    component.createForm = formBuilder.group({
      retusd: [1]
    });

    component.fullReimbursement({ source: undefined, checked: true });

    expect(resetSpy).toHaveBeenCalled();
    expect(clearValidatorsSpy).toHaveBeenCalled();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should be fullReimbursement with checkbox false', () => {
    const retusdControl = component.createForm.get('retusd');

    const enableSpy = spyOn(retusdControl, 'enable');
    const setValidatorsSpy = spyOn(retusdControl, 'setValidators');

    component.createForm = formBuilder.group({
      retusd: [1]
    });

    component.fullReimbursement({ source: undefined, checked: false });

    expect(enableSpy).toHaveBeenCalled();
    expect(setValidatorsSpy).toHaveBeenCalled();
  });

});
