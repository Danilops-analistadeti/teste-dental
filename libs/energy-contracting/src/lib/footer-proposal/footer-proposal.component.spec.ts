import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterProposalComponent } from './footer-proposal.component';

describe('FooterProposalComponent', () => {
  let component: FooterProposalComponent;
  let fixture: ComponentFixture<FooterProposalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterProposalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
