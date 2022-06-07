import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnergyQuoteSummaryComponent } from './energy.component';

describe('EnergyQuoteSummaryComponent', () => {
  let component: EnergyQuoteSummaryComponent;
  let fixture: ComponentFixture<EnergyQuoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyQuoteSummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyQuoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
