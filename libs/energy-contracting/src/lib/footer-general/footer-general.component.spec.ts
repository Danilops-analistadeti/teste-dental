import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { FooterGeneralComponent } from '@energy-contracting';

describe('FooterGeneralComponent', () => {
  let component: FooterGeneralComponent;
  let fixture: ComponentFixture<FooterGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterGeneralComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
