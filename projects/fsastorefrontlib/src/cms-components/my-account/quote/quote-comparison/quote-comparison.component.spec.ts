import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComparisonComponent } from './quote-comparison.component';

describe('QuoteComparisonComponent', () => {
  let component: QuoteComparisonComponent;
  let fixture: ComponentFixture<QuoteComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
