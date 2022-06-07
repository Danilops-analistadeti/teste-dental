import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessCreateQuotationComponent } from './success-create-quotation.component';

describe('SuccessCreateQuotationComponent', () => {
  let component: SuccessCreateQuotationComponent;
  let fixture: ComponentFixture<SuccessCreateQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessCreateQuotationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCreateQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
