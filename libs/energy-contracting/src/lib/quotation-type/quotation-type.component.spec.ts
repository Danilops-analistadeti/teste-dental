import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuotationTypeComponent } from './quotation-type.component';

describe('QuotationTypeComponent', () => {
  let component: QuotationTypeComponent;
  let fixture: ComponentFixture<QuotationTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
