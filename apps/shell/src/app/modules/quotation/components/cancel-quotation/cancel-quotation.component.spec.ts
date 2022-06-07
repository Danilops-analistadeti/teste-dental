import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { NotificationsService } from "@esferaenergia/esfera-ui/public-api";
import { QuotationService } from "projects/energy-contracting/src/public-api";
import { of, throwError } from "rxjs";
import { CancelQuotationComponent } from './cancel-quotation.component';

const notificationServiceStub: Partial<NotificationsService> = {
  error: (message: string, dismissTime?: number): any => undefined,
  success: (message: string, dismissTime?: number): any => undefined,
}

describe('CancelQuotationComponent', () => {
  let component: CancelQuotationComponent;
  let fixture: ComponentFixture<CancelQuotationComponent>;
  let quotationService: QuotationService;
  let notificationService: NotificationsService;
  let dialogRef: MatDialogRef<CancelQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelQuotationComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: QuotationService,
          useValue: {
            cancelQuotation: (quotationId: string, justification: string) => of()
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (value: boolean) => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 'test'
          }
        },
        {
          provide: NotificationsService,
          useValue: notificationServiceStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelQuotationComponent);
    component = fixture.componentInstance;
    quotationService = TestBed.inject(QuotationService);
    notificationService = TestBed.inject(NotificationsService);
    dialogRef = TestBed.inject(MatDialogRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be submit', () => {
    component.justificationControl = new FormControl('test');

    const cancelQuotationSpy = spyOn(quotationService, 'cancelQuotation').and.returnValue(of({ id: '' }));
    const successSpy = spyOn(notificationService, 'success').and.stub();
    const closeSpy = spyOn(dialogRef, 'close').and.stub();

    component.submit();

    expect(cancelQuotationSpy).toHaveBeenCalledWith('test', 'test');
    expect(successSpy).toHaveBeenCalledWith('Cotação cancelada com sucesso!');
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('should push error message', () => {
    const error = {
      message: 'test'
    };

    component.justificationControl = new FormControl();

    const cancelQuotationSpy = spyOn(quotationService, 'cancelQuotation').and.returnValue(throwError({ error }));
    const errorSpy = spyOn(notificationService, 'error').and.stub();
    const closeSpy = spyOn(dialogRef, 'close').and.stub();

    component.submit();

    expect(cancelQuotationSpy).toHaveBeenCalledWith('test', null);
    expect(errorSpy).toHaveBeenCalledWith(error.message);
    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});
