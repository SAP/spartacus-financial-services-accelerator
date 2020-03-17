import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProcessStepComponent } from './change-process-step.component';

describe('ChangeProcessStepComponent', () => {
  let component: ChangeProcessStepComponent;
  let fixture: ComponentFixture<ChangeProcessStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeProcessStepComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
