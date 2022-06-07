import { DatePipe, DecimalPipe, KeyValue, KeyValuePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertDecimalPipe, CountDownDirective, ParseCreateQuotation, Quotation } from 'projects/energy-contracting/src/public-api';
import { CancelQuotationComponent } from '../cancel-quotation/cancel-quotation.component';
import { baseCancelQuotationDataModal } from './constants/base-cancel-quotation-data-modal.constant';
import { OffersReceivedComponent } from './offers-received.component';

describe('OffersReceivedComponent', () => {
  let component: OffersReceivedComponent;
  let fixture: ComponentFixture<OffersReceivedComponent>;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OffersReceivedComponent, CountDownDirective],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        ParseCreateQuotation,
        ConvertDecimalPipe,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
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
        {
          provide: DatePipe, useValue: {
            transform: (value: any, digitsInfo?: string, locale?: string): void => { }
          }
        },
        {
          provide: MatDialog,
          useValue: {
            open<T, D = any, R = any>(component: any, config?: any): any {
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersReceivedComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be cancelQuotation', () => {
    const id = 'test';

    component.quotation = {
      id
    } as Quotation;

    const openSpy = spyOn(dialog, 'open').and.stub();

    component.cancelQuotation();

    expect(openSpy).toHaveBeenCalledWith(CancelQuotationComponent, {
      ...baseCancelQuotationDataModal,
      data: {
        id
      }
    });
  });
});
