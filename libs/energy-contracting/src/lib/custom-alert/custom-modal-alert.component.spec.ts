import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomModalAlertComponent } from './custom-modal-alert.component';

describe('CustomAlertComponent', () => {
  let component: CustomModalAlertComponent;
  let fixture: ComponentFixture<CustomModalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomModalAlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
