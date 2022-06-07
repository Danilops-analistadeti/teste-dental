import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringProposalComponent } from './hiring-proposal.component';

describe('HiringProposalComponent', () => {
  let component: HiringProposalComponent;
  let fixture: ComponentFixture<HiringProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
