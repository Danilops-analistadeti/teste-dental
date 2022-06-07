import { Component } from '@angular/core';

@Component({
  selector: 'ec-pre-registration',
  templateUrl: './pre-registration.component.html',
  styleUrls: ['./pre-registration.component.scss']
})
export class PreRegistrationComponent {
  isSuccess: boolean;

  showSuccess(): void {
    this.isSuccess = true;
  }
}
