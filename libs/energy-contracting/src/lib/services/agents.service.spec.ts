import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AgentsService } from './agents.service';
import { environment } from "../../../environments/environment";
import { Agents } from "../interfaces/agents.interface";

const agentsMock: Agents[] = [
  {
    id: 'test123',
    name: 'test',
    fantasyName: 'tesat',
    cnpj: '123456568',
  }
]

describe('AgentsService', () => {
  let service: AgentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AgentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return agents', () => {
    service.getAgents(1, 10).subscribe({
      next: value => expect(value).toEqual(agentsMock)
    })

    const req = httpMock.expectOne(`${environment.AGENTS}?page=1&itemsPerPage=10`);
    req.flush(agentsMock);
  });

  it('should return agents with query filter', () => {
    service.getAgents(1, 10, 'test').subscribe({
      next: value => expect(value).toEqual(agentsMock)
    })

    const req = httpMock.expectOne(`${environment.AGENTS}?query=test&page=1&itemsPerPage=10`);
    req.flush(agentsMock);
  });

  it('should return agents ccee', () => {
    service.getAgentsCCEE().subscribe({
      next: value => expect(value).toEqual(agentsMock)
    })

    const req = httpMock.expectOne(`${environment.BACKOFFICE}/ccee_agents/`);
    req.flush(agentsMock);
  });

  it('should return agents ccee with name filter', () => {
    service.getAgentsCCEE('test').subscribe({
      next: value => expect(value).toEqual(agentsMock)
    })

    const req = httpMock.expectOne(`${environment.BACKOFFICE}/ccee_agents/?name=test`);
    req.flush(agentsMock);
  });
});
