import { Component, Input } from '@angular/core';
import { GeneralData } from '../../interfaces/general-data.interface';

@Component({
  selector: 'ec-general-data-item',
  templateUrl: './general-data-item.component.html',
  styleUrls: ['./general-data-item.component.scss']
})
export class GeneralDataItemComponent {
  @Input() data: GeneralData;

  trackByFn(index: number): number {
    return index;
  }
}
