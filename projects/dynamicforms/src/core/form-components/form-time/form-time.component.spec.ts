import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTimeComponent } from './form-time.component';

describe('FormTimeComponent', () => {
  let component: FormTimeComponent;
  let fixture: ComponentFixture<FormTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
