import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Agents, AgentsService } from '@energy-contracting';
import { BlobPdf, FileService, NotificationsService } from '@esferaenergia/esfera-ui';
import { offerersHeaderColumns } from '../../constants/offerers-header-columns.constant';

@Component({
  selector: 'ec-offerers-item',
  templateUrl: './offerers-item.component.html',
  styleUrls: ['./offerers-item.component.scss']
})
export class OfferersItemComponent {
  @Input() offerer: Agents;

  columns = offerersHeaderColumns;
  getLoadingPDF = false;

  constructor(
    private agents: AgentsService,
    private notificationsService: NotificationsService,
    private changeDetectRef: ChangeDetectorRef,
    private fileService: FileService
  ) {}

  downloadPDF({ id, name }: Agents): void {
    this.getLoadingPDF = true;

    this.agents
      .getAgentsPdf(id)
      .subscribe({
        next: (response) =>
          this.fileService.download(
            this.fileService.base64ToBlob(response, BlobPdf),
            `${name}-${new Date().toLocaleDateString()}`
          ),
        error: ({ message }: HttpErrorResponse) => this.notificationsService.error(message)
      })
      .add(() => {
        this.getLoadingPDF = false;
        this.changeDetectRef.detectChanges();
      });
  }
}
