import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnergyMonthPickerComponent } from './energy-month-picker.component';

describe('EnergyMonthPickerComponent', () => {
  let component: EnergyMonthPickerComponent;
  let fixture: ComponentFixture<EnergyMonthPickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EnergyMonthPickerComponent],
        providers: [DatePipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
