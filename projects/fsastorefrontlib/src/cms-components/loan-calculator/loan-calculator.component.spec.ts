import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { LoanCalculatorService } from './services/loan-calculator.service';
import { DebugElement } from '@angular/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsComponentData } from '@spartacus/storefront';

class MockLoanCalculatorService {
  getAnnuity() {}
  getRepaymentFrequencies() {}
}

describe('LoanCalculatorComponent', () => {
  let loanCalculatorComponent: LoanCalculatorComponent;
  let mockLoanCalculatorService: MockLoanCalculatorService;
  let fixture: ComponentFixture<LoanCalculatorComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      mockLoanCalculatorService = new MockLoanCalculatorService();
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [LoanCalculatorComponent],
        providers: [
          {
            provide: LoanCalculatorService,
            useValue: mockLoanCalculatorService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCalculatorComponent);
    loanCalculatorComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create loan calculator feature component', () => {
    expect(loanCalculatorComponent).toBeTruthy();
  });

  // it('should display product summary', () => {
  //   fixture.detectChanges();
  //   expect(el.query(By.css('.item-details'))).toBeTruthy();
  // });
});
