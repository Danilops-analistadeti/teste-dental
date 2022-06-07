import { Component } from '@angular/core';
import { Owner } from '@energy-contracting';

@Component({
  selector: 'ec-multiple-agents-dialog',
  templateUrl: './multiple-agents-dialog.component.html',
  styleUrls: ['./multiple-agents-dialog.component.scss']
})
export class MultipleAgentsDialogComponent {
  owner: Owner[];
}
