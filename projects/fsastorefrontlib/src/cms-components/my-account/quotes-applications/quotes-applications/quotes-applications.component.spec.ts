import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OccConfig,
  OCC_USER_ID_CURRENT,
  RoutingService,
  TranslationService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { QuotesApplicationsComponent } from './quotes-applications.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { FSCart, InsuranceQuote } from '../../../../occ/occ-models/occ.models';

const cart1: FSCart = {
  code: 'test001',
  insuranceQuote: {
    state: {
      code: 'BIND',
    },
    insuredObjectList: {
      insuredObjects: [
        {
          insuredObjectItems: [
            {
              label: 'tripDestination',
              value: 'Test value1',
            },
            {
              label: 'costOfTrip',
              value: 'Test value2',
            },
          ],
        },
      ],
    },
  },
  entries: [
    {
      product: {
        price: {
          oneTimeChargeEntries: [
            {
              billingTime: {
                code: 'personalliabilitycoverage',
                name: 'Personal Liability',
              },
              price: {
                formattedValue: '€1,000,000.00',
                value: 1000000,
              },
            },
          ],
        },
      },
    },
  ],
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            code: 'insurances_travel',
          },
        },
      ],
    },
  ],
};
const insuranceQuote1: any = {
  cartCode: 'test001',
  defaultCategory: {
    name: 'Test Category 1',
    code: 'testCategory1',
  },
  quoteId: 'test001',
  renewal: true,
};
const insuranceQuote2: any = {
  cartCode: 'test002',
  defaultCategory: {
    name: 'Test Category 1',
    code: 'testCategory1',
  },
  quoteId: 'test002',
};
const insuranceQuote3: any = {
  cartCode: 'test003',
  defaultCategory: {
    name: 'Test Category 3',
    code: 'testCategory3',
  },
  quoteId: 'test002',
};
const quotes = [insuranceQuote1, insuranceQuote2, insuranceQuote3];
const selectedCategory = { name: 'Test Category 1', code: 'testCategory1' };
const sessionStorageMock = {
  setItem(_key: string, _value: string): void {},
} as Storage;
const winRef = {
  get sessionStorage(): Storage {
    return sessionStorageMock;
  },
} as WindowRef;
class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  quoteForCompare$ = new BehaviorSubject<InsuranceQuote>(insuranceQuote1);
  retrieveQuoteCheckout = createSpy().and.returnValue(of(cart1));
  getQuotes() {
    return of(quotes);
  }
  loadQuotes() {}
  getLoaded() {}
  getQuotesLoaded() {}
  setQuoteForCompare() {
    return this.quoteForCompare$.asObservable();
  }
  getQuotesApplications() {
    return of(quotes);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const MockOccConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of({ code: 'cartCode' });
  }
}

class MockPolicyChartDataService {
  getObjectValueByProperty() {}
}

class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

class MockTranslationService {
  translate(key: string): Observable<string> {
    switch (key) {
      case 'quote.allQuotes':
        return of('All quotes');
      case 'quote.renewalQuotes':
        return of('Renewal Quotes');
      default:
        return of(key);
    }
  }
}

describe('QuotesApplicationsComponent', () => {
  let component: QuotesApplicationsComponent;
  let fixture: ComponentFixture<QuotesApplicationsComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let cartService: ActiveCartService;
  let policyChartDataService: PolicyChartDataService;
  let globalMessageService: GlobalMessageService;
  let translationService: TranslationService;
  let mockUserService: UserIdService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuotesApplicationsComponent],
        providers: [
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: OccConfig,
            useValue: MockOccConfig,
          },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: PolicyChartDataService,
            useClass: MockPolicyChartDataService,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
          { provide: WindowRef, useValue: winRef },
          { provide: UserIdService, useClass: MockUserIdService },
        ],
      }).compileComponents();
      cartService = TestBed.inject(ActiveCartService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.inject(QuoteService);
    spyOn(quoteService, 'getQuotesApplications').and.callThrough();
    routingService = TestBed.inject(RoutingService);
    policyChartDataService = TestBed.inject(PolicyChartDataService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    translationService = TestBed.inject(TranslationService);
    mockUserService = TestBed.inject(UserIdService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get base url', () => {
    expect(component.baseUrl).toEqual('');
  });

  it('should not retrieve quote', () => {
    component.retrieveQuote({});
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should retrieve quote', () => {
    const quote = { state: { code: 'BIND' }, cartCode: 'cartCode' };
    component.retrieveQuote(quote);
    expect(quoteService.retrieveQuoteCheckout).toHaveBeenCalled();
  });

  it('should select quote', () => {
    spyOn(globalMessageService, 'add').and.stub();
    component.selectQuote(true, insuranceQuote1, quotes);
    component.selectQuote(true, insuranceQuote2, quotes);
    expect(component.quoteCodesForCompare.length).toBe(2);
    component.selectQuote(false, insuranceQuote2, quotes);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quote.successfulSelection',
        params: { category: insuranceQuote1.defaultCategory.name },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      5000
    );
    expect(component.quoteCodesForCompare.length).toBe(1);
  });

  it('should filter quotes', () => {
    component.selectCategory({ name: 'All quotes', code: '' });
    component.selectCategory(selectedCategory);
    expect(component.quotes).toEqual([insuranceQuote1, insuranceQuote2]);
  });

  it('should clear selected quotes', () => {
    component.clearSelectedQuotes();
    component.selectCategory(selectedCategory);
    expect(component.quoteCodesForCompare.length).toBe(0);
  });

  it('should redirect to Quote details page', () => {
    component.goToDetailsPage(insuranceQuote1);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: {
        quoteId: insuranceQuote1.quoteId,
      },
    });
  });

  it('should redirect to Quote details page', () => {
    component.goToComparePage();
    expect(routingService.go).toHaveBeenCalled();
  });
});
