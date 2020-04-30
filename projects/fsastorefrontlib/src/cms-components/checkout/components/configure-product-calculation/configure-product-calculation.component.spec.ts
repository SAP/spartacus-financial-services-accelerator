import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureProductCalculationComponent } from './configure-product-calculation.component';

describe('ConfigureProductCalculationComponent', () => {
  let component: ConfigureProductCalculationComponent;
  let fixture: ComponentFixture<ConfigureProductCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureProductCalculationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureProductCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
