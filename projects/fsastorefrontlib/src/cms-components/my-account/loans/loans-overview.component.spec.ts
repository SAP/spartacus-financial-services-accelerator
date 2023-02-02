import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoansOverviewComponent } from './loans-overview.component';
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
import { OccLoansAdapter } from './services/occ-loans.adapter';
import { HttpClientModule } from '@angular/common/http';

class MockLoanCalculatorService {
  getAnnuity() {}
  getRepaymentFrequencies() {}
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

class MockOccLoansAdapter extends OccLoansAdapter {
  getLoans(userId): Observable<any> {
    return of();
  }
}

describe('LoansOverviewComponent', () => {
  let loanOverviewComponent: LoansOverviewComponent;
  let mockLoanCalculatorService: MockLoanCalculatorService;
  let fixture: ComponentFixture<LoansOverviewComponent>;
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
        declarations: [LoansOverviewComponent],
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
            provide: OccLoansAdapter,
            useClass: MockOccLoansAdapter,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansOverviewComponent);
    loanOverviewComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create loans overview component', () => {
    expect(loanOverviewComponent).toBeTruthy();
  });

  it('should call refresh table data on init', () => {
    spyOn(loanOverviewComponent, 'refreshTableData').and.callThrough();
    loanOverviewComponent.ngOnInit();
    expect(loanOverviewComponent.refreshTableData).toHaveBeenCalled();
  });
});
