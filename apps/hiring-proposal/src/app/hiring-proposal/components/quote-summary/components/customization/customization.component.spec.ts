import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizationQuoteSummaryComponent } from './customization.component';

describe('CustomizationQuoteSummaryComponent', () => {
  let component: CustomizationQuoteSummaryComponent;
  let fixture: ComponentFixture<CustomizationQuoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomizationQuoteSummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationQuoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
