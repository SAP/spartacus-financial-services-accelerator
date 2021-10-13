import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  LanguageService,
  OccConfig,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { QuotesComponent } from './quotes.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';

const insuranceQuote1: any = {
  cartCode: 'test001',
  defaultCategory: {
    name: 'Test Category 1',
    code: 'testCategory1',
  },
  quoteId: 'test001',
  quoteStatus: 'unfinished',
};
const insuranceQuote2: any = {
  cartCode: 'test002',
  defaultCategory: {
    name: 'Test Category 1',
    code: 'testCategory1',
  },
  quoteId: 'test002',
  quoteStatus: 'unfinished',
};
const insuranceQuote3: any = {
  cartCode: 'test003',
  defaultCategory: {
    name: 'Test Category 3',
    code: 'testCategory3',
  },
  quoteId: 'test002',
  quoteStatus: 'unfinished',
};
const quotes = [insuranceQuote1, insuranceQuote2, insuranceQuote3];
const selectedCategory = { name: 'Test Category 1', code: 'testCategory1' };
class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  quoteForCompare$ = new BehaviorSubject<InsuranceQuote>(insuranceQuote1);
  retrieveQuoteCheckout = createSpy();
  getQuotes() {
    return of(quotes);
  }
  loadQuotes() {}
  getLoaded() {}
  getQuotesLoaded() {}
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

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

class MockTranslationService {
  translate(key: string): Observable<string> {
    switch (key) {
      case 'quote.allQuotes':
        return of('All quotes');
      default:
        return of(key);
    }
  }
}

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let cartService: ActiveCartService;
  let policyChartDataService: PolicyChartDataService;
  let languageService: LanguageService;
  let globalMessageService: GlobalMessageService;
  let translationService: TranslationService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuotesComponent],
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
            provide: LanguageService,
            useClass: MockLanguageService,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
        ],
      }).compileComponents();
      cartService = TestBed.inject(ActiveCartService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.inject(QuoteService);
    routingService = TestBed.inject(RoutingService);
    policyChartDataService = TestBed.inject(PolicyChartDataService);
    languageService = TestBed.inject(LanguageService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    translationService = TestBed.inject(TranslationService);
    component.language = 'de';
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
    spyOn(quoteService, 'getQuotes').and.callThrough();
    component.selectCategory({ name: 'All quotes', code: '' });
    component.selectCategory(selectedCategory);
    expect(quoteService.getQuotes).toHaveBeenCalled();
  });

  it('should clear selected quotes', () => {
    component.clearSelectedQuotes();
    component.selectCategory(selectedCategory);
    expect(component.quoteCodesForCompare.length).toBe(0);
  });
});
