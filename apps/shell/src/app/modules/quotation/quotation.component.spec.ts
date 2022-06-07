import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuotationService } from '@energy-contracting';
import {
  Base64Service,
  BlobExcel,
  EsferaButtonModule,
  EsferaIconModule,
  EsferaModalModule,
  EsferaReplaceModule,
  EsferaSkeletonModule,
  EsferaVirtualScrollModule,
  NgxCurrencyModule
} from '@esferaenergia/esfera-ui';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Notification } from '@esferaenergia/esfera-ui/lib/notifications/model/notification';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsModule } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { QuotationDateTimerPipe } from './pipes/quotation-date-timer.pipe';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';

const quotationServiceStub: Partial<QuotationService> = {
  exportQuotations: (): Observable<string> => of(),
  getAllQuotationsWithParams: (params?: QuotationsParams): Observable<Quotation[]> => of()
};

describe('QuotationComponent', () => {
  let component: QuotationComponent;
  let fixture: ComponentFixture<QuotationComponent>;
  let quotationService: QuotationService;
  let fileDownloadService: FileDownloadService;
  let base64Service: Base64Service;
  let notificationsService: NotificationsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationComponent, QuotationDateTimerPipe],
        imports: [
          HttpClientTestingModule,
          MatInputModule,
          MatDialogModule,
          MatButtonModule,
          NgxCurrencyModule,
          NgxMatDatetimePickerModule,
          NgxMatTimepickerModule,
          NgxMatNativeDateModule,
          MatNativeDateModule,
          MatDatepickerModule,
          MatIconModule,
          FormsModule,
          MatMomentDateModule,
          ReactiveFormsModule,
          QuotationRoutingModule,
          MatSelectModule,
          SharedModule,
          MatExpansionModule,
          MatProgressSpinnerModule,
          NgxsModule.forRoot(),
          MatAutocompleteModule,
          MatTooltipModule,
          MatSortModule,
          EsferaModalModule,
          EsferaButtonModule,
          MultiselectModule,
          MatSlideToggleModule,
          EsferaVirtualScrollModule,
          EsferaReplaceModule,
          MatStepperModule,
          EsferaIconModule,
          NgSelectModule,
          EsferaSkeletonModule,
          MatCheckboxModule,
          MatMenuModule
        ],
        providers: [
          { provide: QuotationService, useValue: quotationServiceStub },
          {
            provide: Base64Service,
            useValue: {
              base64ToBlob: (b64Data: string, sliceSize: number | undefined, type: string): Blob => new Blob()
            }
          },
          {
            provide: FileDownloadService,
            useValue: {
              download: (data: Blob, filename: string): void => {}
            }
          },
          {
            provide: QuotationDateTimerPipe,
            useValue: {
              transform: (quotation: Quotation): string => ''
            }
          },
          {
            provide: NotificationsService,
            useValue: {
              error: (message: string, dismissTime?: number): Notification => null
            }
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationComponent);
    component = fixture.componentInstance;
    quotationService = TestBed.inject(QuotationService);
    fileDownloadService = TestBed.inject(FileDownloadService);
    base64Service = TestBed.inject(Base64Service);
    notificationsService = TestBed.inject(NotificationsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make download request', () => {
    const base64 = 'test123';
    const blob = new Blob();

    const exportQuotationsSpy = spyOn(quotationService, 'exportQuotations').and.returnValue(of(base64));
    const base64ToBlobSpy = spyOn(base64Service, 'base64ToBlob').and.returnValue(blob);
    const downloadSpy = spyOn(fileDownloadService, 'download').and.stub();

    component.exportQuotations();

    expect(exportQuotationsSpy).toHaveBeenCalled();
    expect(base64ToBlobSpy).toHaveBeenCalledWith(base64, undefined, BlobExcel);
    expect(downloadSpy).toHaveBeenCalledWith(blob, `Lista de Cotações (${new Date().toLocaleDateString()})`);
  });
});
