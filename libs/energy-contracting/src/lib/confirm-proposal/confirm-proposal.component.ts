import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmProposal } from '../interfaces/confirm-proposal.interface';

@Component({
  selector: 'ec-confirm-proposal',
  templateUrl: './confirm-proposal.component.html',
  styleUrls: ['../scss/confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmProposalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmProposal) {}
}
