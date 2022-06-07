import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { EmailSended } from '../../interfaces/email-sended.interface';
import { InviteService } from '../../services/invite.service';

@Component({
  selector: 'ec-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss']
})
export class SendInviteComponent {
  emailControl = new FormControl('', [Validators.email, Validators.required]);

  constructor(private dialog: MatDialog, private service: InviteService, private notification: NotificationsService) {}

  close(): void {
    this.dialog.closeAll();
  }

  send(): void {
    this.dialog.closeAll();
    this.service.sendEmail(this.emailControl.value).subscribe({
      next: ({ email }: EmailSended) => this.notification.success(`Convite enviado para ${email} com sucesso!`),
      error: ({ error }) => this.notification.error(error.message)
    });
  }
}
