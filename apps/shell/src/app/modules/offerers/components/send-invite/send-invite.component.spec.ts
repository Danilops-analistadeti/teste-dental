import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendInviteComponent } from './send-invite.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InviteService } from '../../services/invite.service';
import { of, throwError } from 'rxjs';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Notification } from '@esferaenergia/esfera-ui/lib/notifications/model/notification';
import { EmailSended } from '../../interfaces/email-sended.interface';

const notificationStub: Partial<NotificationsService> = {
  success: (message: string, dismissTime?: number): Notification => null,
  error: (message: string, dismissTime?: number): Notification => null
};

const emailSended: EmailSended = {
  email: 'test@email.com'
};

describe('SendInviteComponent', () => {
  let component: SendInviteComponent;
  let fixture: ComponentFixture<SendInviteComponent>;
  let dialog: MatDialog;
  let service: InviteService;
  let notification: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendInviteComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        EsferaButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        InviteService,
        {
          provide: NotificationsService,
          useValue: notificationStub
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInviteComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    service = TestBed.inject(InviteService);
    notification = TestBed.inject(NotificationsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    const closeAllSpy = spyOn(dialog, 'closeAll').and.stub();

    component.close();

    expect(closeAllSpy).toHaveBeenCalled();
  });

  describe('send', () => {
    it('should send email to invite', () => {
      const sendEmailSpy = spyOn(service, 'sendEmail').and.returnValue(of(emailSended));

      component.send();

      expect(sendEmailSpy).toHaveBeenCalled();
    });

    it('should close modal after send email', () => {
      const closeAllSpy = spyOn(dialog, 'closeAll').and.stub();
      const sendEmailSpy = spyOn(service, 'sendEmail').and.returnValue(of(emailSended));

      component.send();

      expect(closeAllSpy).toHaveBeenCalledBefore(service.sendEmail);
      expect(sendEmailSpy).toHaveBeenCalled();
    });

    it('should show success notification after send email', () => {
      const successSpy = spyOn(notification, 'success');
      const sendEmailSpy = spyOn(service, 'sendEmail').and.returnValue(of(emailSended));

      component.send();

      expect(sendEmailSpy).toHaveBeenCalledBefore(notification.success);
      expect(successSpy).toHaveBeenCalledWith(`Convite enviado para ${emailSended.email} com sucesso!`);
    });

    it('should show error notification when error response', () => {
      const message = 'Ocorreu um erro!';
      const error = {
        error: { message }
      };

      const errorSpy = spyOn(notification, 'error');
      const sendEmailSpy = spyOn(service, 'sendEmail').and.returnValue(throwError(error));

      component.send();

      expect(sendEmailSpy).toHaveBeenCalledBefore(notification.error);
      expect(errorSpy).toHaveBeenCalledWith(message);
    });
  });
});
