import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateMonthYearComponent } from './date-month-year.component';

describe('DateMonthYearComponent', () => {
  let component: DateMonthYearComponent;
  let fixture: ComponentFixture<DateMonthYearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateMonthYearComponent],
      imports:
        [
          MatDatepickerModule,
          ReactiveFormsModule,
          FormsModule
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateMonthYearComponent);
    component = fixture.componentInstance;

    (fixture.componentInstance as any).ngControl = { control: new FormControl() };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
