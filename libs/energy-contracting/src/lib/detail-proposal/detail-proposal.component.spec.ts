import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EsferaReplaceModule } from '@esferaenergia/esfera-ui';
import { DetailProposalComponent } from './detail-proposal.component';

describe('DetailProposalComponent', () => {
  let component: DetailProposalComponent;
  let fixture: ComponentFixture<DetailProposalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailProposalComponent],
      imports: [EsferaReplaceModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
