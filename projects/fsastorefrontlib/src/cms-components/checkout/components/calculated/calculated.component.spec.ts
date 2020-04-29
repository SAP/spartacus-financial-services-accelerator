import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedComponent } from './calculated.component';

describe('CalculatedComponent', () => {
  let component: CalculatedComponent;
  let fixture: ComponentFixture<CalculatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
