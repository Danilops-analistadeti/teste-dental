import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Quotation, QuotationType } from '@energy-contracting';
import { MultipleAgentsDialogComponent } from '../multiple-agents-dialog/multiple-agents-dialog.component';

@Component({
  selector: 'ec-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss']
})
export class QuoteSummaryComponent implements OnInit {
  @Input() quotation: Quotation;

  buyer: string = QuotationType.BUYER;
  selected = new FormControl(0);
  labelCompany: string;
  labelOwners: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.validateIsMultipleAgents();
  }

  openModalMultipleAgents(): void {
    const multipleAgentsDialog = this.dialog.open(MultipleAgentsDialogComponent);

    multipleAgentsDialog.componentInstance.owner = this.quotation.owner;
  }

  validateIsMultipleAgents(): void {
    if (this.quotation.owner.length > 1) {
      this.labelCompany = 'Multiplos agentes';
      this.labelOwners = `${this.quotation.owner[0].fantasyName}; + ${this.quotation.owner.length}`;
    } else {
      this.labelCompany = 'Empresa';
      this.labelOwners = this.quotation.owner[0].fantasyName;
    }
  }
  onTabChanged(matTab: MatTabChangeEvent): void {
    this.selected.setValue(matTab.index);
  }
}
