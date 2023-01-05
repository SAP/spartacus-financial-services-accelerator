import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { LoanCalculatorService } from './services/loan-calculator.service';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsComponent, CurrencyService } from '@spartacus/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockLoanCalculatorService {
  getAnnuity() {}
  getRepaymentFrequencies() {}
}

const componentData = {
  uid: 'TestLoanComponent',
  typeCode: 'TestLoanComponent',
  name: 'Test Loan Component',
  applicationId: 'application1',
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

class MockCurrencyService {
  getActive() {
    return of('EUR');
  }
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
        imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
        declarations: [LoanCalculatorComponent],
        providers: [
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: CurrencyService,
            useClass: MockCurrencyService,
          },
          {
            provide: LoanCalculatorService,
            useClass: MockLoanCalculatorService,
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
});
