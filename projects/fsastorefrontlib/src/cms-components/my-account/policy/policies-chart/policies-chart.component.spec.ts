import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesChartComponent } from './policies-chart.component';

describe('PoliciesChartComponent', () => {
  let component: PoliciesChartComponent;
  let fixture: ComponentFixture<PoliciesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
