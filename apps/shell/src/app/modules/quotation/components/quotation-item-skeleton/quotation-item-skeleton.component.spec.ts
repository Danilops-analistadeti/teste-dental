/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EsferaSkeletonModule } from '@esferaenergia/esfera-ui';
import { QuotationItemSkeletonComponent } from './quotation-item-skeleton.component';

describe('QuotationItemSkeletonComponent', () => {
  let component: QuotationItemSkeletonComponent;
  let fixture: ComponentFixture<QuotationItemSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationItemSkeletonComponent],
      imports: [HttpClientTestingModule, EsferaSkeletonModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skeletons', () => {
    component.loading = true;
    const skeletons = document.getElementById('skeleton-item-1');

    expect(skeletons).toBeDefined();
  });
});
