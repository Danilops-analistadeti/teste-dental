import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Agents, AgentsService } from '@energy-contracting';
import { BlobExcel, FileService } from '@esferaenergia/esfera-ui';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Subscription } from 'rxjs';
import { SendInviteComponent } from './components/send-invite/send-invite.component';
import { sendInviteModal } from './constants/send-invite-modal.constant';

@Component({
  selector: 'ec-offerers',
  templateUrl: './offerers.component.html',
  styleUrls: ['./offerers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferersComponent implements OnInit {
  page = 1;
  lastQuery: string | undefined;
  searching: boolean | undefined;
  rows: Agents[] = [];
  subscription!: Subscription;

  constructor(
    private service: AgentsService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private fileService: FileService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(query?: string, nextPage: number = 1): void {
    this.searching = query !== this.lastQuery;
    this.subscription = this.service
      .getAgents(nextPage ?? this.page, 25, query)
      .subscribe({
        next: (value) => {
          if (query || nextPage === 1) {
            this.lastQuery = query;
            this.rows = [];
          }

          this.page = nextPage;
          this.rows.push(...value);
        }
      })
      .add(() => {
        this.searching = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  openInviteModal(): void {
    this.dialog.open(SendInviteComponent, sendInviteModal);
  }

  exportOfferers(): void {
    this.service.getAgentsExcel().subscribe({
      next: (value) =>
        this.fileService.download(
          this.fileService.base64ToBlob(value, BlobExcel),
          `Lista de Ofertantes(${new Date().toLocaleDateString()})`
        ),
      error: ({ error }) => this.notificationsService.error(error.message)
    });
  }
}
