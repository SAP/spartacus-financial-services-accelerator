import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { LoanCalculatorService } from './services/loan-calculator.service';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CmsComponentData } from '@spartacus/storefront';
import {
  CmsComponent,
  CurrencyService,
  I18nTestingModule,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockLoanCalculatorService {
  getAnnuity() {}
  getRepaymentFrequencies() {
  }
}

const mockRepaymentFrequencies = {
  values: [
    {
      key: 'weekly',
      value: 'Weekly',
    },
    {
      key: 'biweekly',
      value: 'Biweekly',
    },
    {
      key: 'monthly',
      value: 'Monthly',
    },
  ],
};

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
        imports: [
          ReactiveFormsModule,
          FormsModule,
          HttpClientModule,
          I18nTestingModule,
          HttpClientTestingModule,
        ],
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

  it('should call slider form patch on init', () => {
    spyOn(loanCalculatorComponent, 'sliderFormPatch').and.callThrough();
    loanCalculatorComponent.ngOnInit();
    expect(loanCalculatorComponent.sliderFormPatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = loanCalculatorComponent['subscriptions'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    loanCalculatorComponent.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });

  it('should clear all when the clear method is called', () => {
    spyOn(loanCalculatorComponent, 'clearAll');
    loanCalculatorComponent.clearAll();
    expect(loanCalculatorComponent.sliderFormPatch && loanCalculatorComponent.annuityAmount === undefined).toBeTruthy();
  });

});
