import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DetailCustomizationOfferComponent } from './detail-customization-offer';


describe('DetailCustomizationOfferComponent', () => {
  let component: DetailCustomizationOfferComponent;
  let fixture: ComponentFixture<DetailCustomizationOfferComponent>;
  let dialogRef: MatDialogRef<DetailCustomizationOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailCustomizationOfferComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (value: boolean) => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 'test'
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCustomizationOfferComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
