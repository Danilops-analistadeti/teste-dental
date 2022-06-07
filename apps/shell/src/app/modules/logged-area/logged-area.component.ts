import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalyticService } from '@energy-contracting';

@Component({
  selector: 'ec-logged-area',
  templateUrl: './logged-area.component.html',
  styleUrls: ['./logged-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoggedAreaComponent implements OnInit {
  constructor(private analyticService: AnalyticService) {}

  ngOnInit(): void {
    this.analyticService.init();
  }
}
