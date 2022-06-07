import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ClearQuotation } from '@energy-contracting';
import { Store } from '@ngxs/store';

@Component({
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateQuotationComponent implements OnInit, OnDestroy {
  maxHeight!: string;

  constructor(private store: Store) {
    document.getElementById('footer-logged').className = 'd-none';
  }

  ngOnInit(): void {
    this.maxHeight = `${window.innerHeight - 50}px`;
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearQuotation);
  }
}
