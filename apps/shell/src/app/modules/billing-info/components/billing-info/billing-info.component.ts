import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BILLING_INFO_MODAL, Client, ClientsService, CreateBillingInfoComponent } from '@energy-contracting';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ec-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingInfoComponent implements OnInit {
  page = 1;
  dataSource: Client[] = [];
  subscription!: Subscription;
  lastName!: string;
  searching!: boolean;
  errorMessage!: string;

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private changeDetectRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(name?: string, nextPage: number = 1): void {
    this.searching = name !== this.lastName;
    this.subscription = this.clientsService
      .getClients(name, { page: nextPage, itemsPerPage: 10 })
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (response: Client[]) => {
          if (name || nextPage === 1) {
            this.lastName = name;
            this.dataSource = [];
          }

          this.page = nextPage;
          this.dataSource.push(...response);
        },
        error: ({ error }) => (this.errorMessage = error.message)
      })
      .add(() => {
        this.searching = false;
        this.changeDetectRef.detectChanges();
      });
  }

  openBillingInfoModal(): void {
    const createOfferDialog = this.dialog.open(CreateBillingInfoComponent, BILLING_INFO_MODAL);

    createOfferDialog.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.load(null, this.page);
        }
      }
    });
  }
}
