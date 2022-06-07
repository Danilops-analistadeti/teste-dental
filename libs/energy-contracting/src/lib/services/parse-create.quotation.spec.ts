import { DatePipe, DecimalPipe, KeyValue, KeyValuePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertDecimalPipe, Quotation, quotationFixture } from 'projects/energy-contracting/src/public-api';
import { ParseCreateQuotation } from './parse-create-quotation';


describe('ParseCreateQuotation', () => {
  let service: ParseCreateQuotation;
  let datePipe: DatePipe;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        DatePipe,
        ParseCreateQuotation,
        ConvertDecimalPipe,
        {
          provide: DecimalPipe, useValue: {
            transform: (value: any, format?: string, timezone?: string, locale?: string) => void {}
          }
        },
        {
          provide: KeyValuePipe, useValue: {
            transform<K extends number, V>(input: Record<K, V>, compareFn?: (a: KeyValue<string, V>, b: KeyValue<string, V>) => number): void { }
          }
        },
      ]
    });
    service = TestBed.inject(ParseCreateQuotation);
    datePipe = TestBed.inject(DatePipe);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be parseCreateQuotation', () => {
    const startDate = '2021-05-03';
    const mockQuotation: Partial<Quotation> = {
      endDate: '2020-11-16',
      startDate,
      energySource: quotationFixture.energySource,
      energyVolumeAverage: quotationFixture.energyVolumeAverage,
      expiration: quotationFixture.expiration,
      ownerId: quotationFixture.ownerId,
      paymentBusinessDay: quotationFixture.paymentBusinessDay,
      priceType: quotationFixture.priceType,
      proposalSubmission: quotationFixture.proposalSubmission,
      quotationType: quotationFixture.quotationType,
      subMarketRegion: quotationFixture.subMarketRegion,
      observation: quotationFixture.observation,
      retusd: quotationFixture.retusd ?? 0,
      companyGroups: undefined,
      billingInfo: null,
      indexer: undefined
    };

    const form = formBuilder.group({
      ownerId: new FormControl(quotationFixture.ownerId),
      quotationType: new FormControl(quotationFixture.quotationType),
      priceType: new FormControl(quotationFixture.priceType),
      energyVolume: new FormControl(quotationFixture.energyVolumeAverage),
      energyVolumeAverage: new FormControl(quotationFixture.energyVolumeAverage),
      expiration: new FormControl(new Date(quotationFixture.expiration)),
      paymentBusinessDay: new FormControl(quotationFixture.paymentBusinessDay),
      retusd: new FormControl(quotationFixture.retusd),
      energySource: new FormControl(quotationFixture.energySource),
      startDate: new FormControl(startDate),
      endDate: new FormControl(quotationFixture.endDate),
      subMarketRegion: new FormControl(quotationFixture.subMarketRegion),
      proposalSubmission: new FormControl(new Date(quotationFixture.proposalSubmission)),
      observation: new FormControl(quotationFixture.observation),
      companyGroups: new FormControl(undefined),
      billingInfo: new FormControl(null),
    });

    const createQuotation = service.parseCreateQuotation(form.value);

    expect(createQuotation).toEqual(mockQuotation);
  });
});
