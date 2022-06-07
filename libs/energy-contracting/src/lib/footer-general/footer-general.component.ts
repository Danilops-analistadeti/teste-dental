import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'ec-footer-general',
  templateUrl: './footer-general.component.html',
  styleUrls: ['./footer-general.component.scss']
})
export class FooterGeneralComponent {
  readonly environment = environment;
}
