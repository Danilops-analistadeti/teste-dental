import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClientsService } from './clients.service';
import { environment } from '../../../environments/environment';
import { Client } from '../interfaces/client.interface';

const clientMock: Client =  {
  id: 'test',
  name: 'test'
};

describe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should return clients', () => {
    service.getClients().subscribe({
      next: value => expect(value).toEqual([clientMock])
    });

    const request = httpMock.expectOne(`${environment.CLIENTS}`, 'GET');
    request.flush([clientMock]);
  });

  it('should return clients with name filter', () => {
    service.getClients('test').subscribe({
      next: value => expect(value).toEqual([clientMock])
    });

    const request = httpMock.expectOne(`${environment.CLIENTS}?name=test`, 'GET');
    request.flush([clientMock]);
  });

  it('should return clients with pagination', () => {
    service.getClients(undefined, { page: 1, itemsPerPage: 10 }).subscribe({
      next: value => expect(value).toEqual([clientMock])
    });

    const request = httpMock.expectOne(`${environment.CLIENTS}?page=1&itemsPerPage=10`);
    request.flush([clientMock]);
  });
});
