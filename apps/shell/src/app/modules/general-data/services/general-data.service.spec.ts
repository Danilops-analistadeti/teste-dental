import { TestBed } from '@angular/core/testing';

import { GeneralDataService } from './general-data.service';
import { GeneralData } from "../interfaces/general-data.interface";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../../../environments/environment";

describe('GeneralDataService', () => {
  let service: GeneralDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GeneralDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return general data', () => {
    const generalData: GeneralData = {
      id: 'b4a18caf-a395-4df4-a286-2f12adc14474',
      cnpj:'123122312312312',
      name: 'Esfera energia',
      fantasyName: 'Esfera',
      features: [
        {
          id: '65de0992-2af7-46bb-b784-1af22075d45c',
          name: 'test',
          alias: 'TEST'
        }
      ]
    };

    service.getGeneralData().subscribe({
      next: value => expect(value).toEqual(generalData)
    })

    const req = httpMock.expectOne(`${environment.COMPANY}/`, 'GET');
    req.flush(generalData);
  });
});
