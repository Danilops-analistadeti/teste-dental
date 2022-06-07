import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { quotationFixture } from '@energy-contracting';
import { noop } from 'rxjs';
import { QuotationsComponent } from './quotations.component';

describe('OffersComponent', () => {
  let component: QuotationsComponent;
  let fixture: ComponentFixture<QuotationsComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationsComponent],
        imports: [BrowserAnimationsModule],
        providers: [{ provide: ChangeDetectorRef, useValue: { detectChanges: () => noop } }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsComponent);
    component = fixture.componentInstance;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call ngOnInit', () => {
    component.dataSource = [quotationFixture];

    component.ngOnInit();

    expect(component.data).toEqual(component.dataSource);
  });

  it('should be refreshDataSource', () => {
    component.dataSource = [];

    fixture.detectChanges();

    const quotationMock = [quotationFixture];

    component.refreshDataSource(quotationMock);

    expect(component.dataSource).toEqual(quotationMock);
  });
});
