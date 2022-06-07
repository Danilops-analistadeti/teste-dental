import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyGroupService } from './company-group.service';


describe('CompanyGroupService', () => {
  let service: CompanyGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompanyGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
