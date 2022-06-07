import { TestBed } from '@angular/core/testing';
import { InviteService } from './invite.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../../../environments/environment";
import { EmailSended } from "../interfaces/email-sended.interface";

describe('InviteService', () => {
  let service: InviteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InviteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send request with the invite', () => {
    const email = 'test@email.com';
    const emailResponse: EmailSended = {
      email
    };

    service.sendEmail(email).subscribe({
      next: (value) => expect(value).toEqual(emailResponse)
    });

    const req = httpMock.expectOne(`${environment.ENV_PATH}/invitation/`, 'POST');
    req.flush(emailResponse);
  });
});
