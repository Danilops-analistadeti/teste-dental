import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupCheckoutComponent } from './popup-checkout.component';

describe('PopupCheckoutComponent', () => {
  let component: PopupCheckoutComponent;
  let fixture: ComponentFixture<PopupCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupCheckoutComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
