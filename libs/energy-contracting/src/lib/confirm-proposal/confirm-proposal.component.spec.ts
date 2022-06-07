import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConvertDecimalPipe } from '../pipes/convert-decimal.pipe';
import { TransformMwhPipe } from '../pipes/transform-mwh.pipe';
import { ConfirmProposalComponent } from './confirm-proposal.component';

describe('ConfirmProposalComponent', () => {
  let component: ConfirmProposalComponent;
  let fixture: ComponentFixture<ConfirmProposalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmProposalComponent, ConvertDecimalPipe, TransformMwhPipe],
      imports: [MatDialogModule],
      providers: [
        DecimalPipe,
        TransformMwhPipe,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
