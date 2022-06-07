import { Component } from '@angular/core';
import { benefits } from '../../constants/benefits.constant';
import { Benefits } from '../../interfaces/benefits.interface';

@Component({
  selector: 'ec-registration-information',
  templateUrl: './registration-information.component.html',
  styleUrls: ['./registration-information.component.scss']
})
export class RegistrationInformationComponent {
  benefits = benefits;

  trackByFn(item: Benefits): string {
    return item.title;
  }
}
