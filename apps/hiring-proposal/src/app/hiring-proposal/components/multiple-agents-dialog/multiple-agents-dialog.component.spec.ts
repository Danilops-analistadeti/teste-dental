import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleAgentsDialogComponent } from './multiple-agents-dialog.component';

describe('MultipleAgentsDialogComponent', () => {
  let component: MultipleAgentsDialogComponent;
  let fixture: ComponentFixture<MultipleAgentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleAgentsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAgentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
