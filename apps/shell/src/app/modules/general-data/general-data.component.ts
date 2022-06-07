import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralData } from './interfaces/general-data.interface';
import { GeneralDataService } from './services/general-data.service';

@Component({
  selector: 'ec-general-data',
  templateUrl: './general-data.component.html'
})
export class GeneralDataComponent implements OnInit, OnDestroy {
  generalData: GeneralData;
  subscription: Subscription;
  errorMessage: string;

  constructor(private service: GeneralDataService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.subscription = this.service.getGeneralData().subscribe({
      next: (value) => (this.generalData = value),
      error: ({ error }) => (this.errorMessage = error.message)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
