import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillingInfoItemComponent } from './billing-info-item.component';

describe('BillingInfoItemComponent', () => {
  let component: BillingInfoItemComponent;
  let fixture: ComponentFixture<BillingInfoItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingInfoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
