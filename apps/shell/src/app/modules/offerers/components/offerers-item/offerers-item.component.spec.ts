import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferersItemComponent } from './offerers-item.component';

describe('OfferersItemComponent', () => {
  let component: OfferersItemComponent;
  let fixture: ComponentFixture<OfferersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferersItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
