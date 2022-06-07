import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConvertDecimalPipe } from '@energy-contracting';
import { EsferaReplaceModule } from '@esferaenergia/esfera-ui';
import { QuotationDateTimerPipe } from '../../pipes/quotation-date-timer.pipe';
import { QuotationItemComponent } from './quotation-item.component';

describe('QuotationItemComponent', () => {
  let component: QuotationItemComponent;
  let fixture: ComponentFixture<QuotationItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationItemComponent, QuotationDateTimerPipe, ConvertDecimalPipe],
        imports: [HttpClientTestingModule, EsferaReplaceModule],
        providers: [
          QuotationDateTimerPipe,
          {
            provide: DecimalPipe,
            useValue: {
              transform: (value: any, format?: string, timezone?: string, locale?: string): void => {}
            }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
