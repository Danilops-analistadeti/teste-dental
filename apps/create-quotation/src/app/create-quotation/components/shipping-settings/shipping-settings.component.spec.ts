import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingSettingsComponent } from './shipping-settings.component';

describe('ShippingSettingsComponent', () => {
  let component: ShippingSettingsComponent;
  let fixture: ComponentFixture<ShippingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
