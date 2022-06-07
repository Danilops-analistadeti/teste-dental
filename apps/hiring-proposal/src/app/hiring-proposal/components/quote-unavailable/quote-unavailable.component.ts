import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteUnavailable } from '../../interfaces/quote-unavailable.inteface';

@Component({
  selector: 'ec-quote-unavailable',
  templateUrl: './quote-unavailable.component.html',
  styleUrls: ['./quote-unavailable.component.scss'],
})
export class QuoteUnavailableComponent implements OnInit {
  state$: Observable<QuoteUnavailable>;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getStateWithRoute();
  }

  getStateWithRoute(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
  }
}
