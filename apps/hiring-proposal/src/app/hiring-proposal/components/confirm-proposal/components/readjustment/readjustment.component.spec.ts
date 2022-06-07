import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadjustmentComponent } from './readjustment.component';

describe('ReadjustmentComponent', () => {
  let component: ReadjustmentComponent;
  let fixture: ComponentFixture<ReadjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
