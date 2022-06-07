import { DecimalPipe } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { ExportXlsxService } from './export-xlsx.service';

describe('Service: ExportXlsx', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportXlsxService, DecimalPipe]
    });
  });

  it('should ...', inject([ExportXlsxService], (service: ExportXlsxService) => {
    expect(service).toBeTruthy();
  }));
});
