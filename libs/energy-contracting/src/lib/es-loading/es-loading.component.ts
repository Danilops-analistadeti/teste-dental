import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-loading',
  templateUrl: './es-loading.component.html',
  styleUrls: ['./es-loading.component.scss']
})
export class LoadingComponent {
  @Input() diameter = 20;
  @Input() color = 'primary';
  @Input() active = false;
  @Input() height = 'auto';
}
