import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoverageComponent } from './change-coverage.component';

describe('ChangeCoverageComponent', () => {
  let component: ChangeCoverageComponent;
  let fixture: ComponentFixture<ChangeCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCoverageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
