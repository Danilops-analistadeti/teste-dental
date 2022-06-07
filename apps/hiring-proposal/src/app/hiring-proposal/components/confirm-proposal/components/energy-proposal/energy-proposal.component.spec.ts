import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnergyProposalComponent } from './energy-proposal.component';

describe('EnergyProposalComponent', () => {
  let component: EnergyProposalComponent;
  let fixture: ComponentFixture<EnergyProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyProposalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
