import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  LanguageService,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { QuoteComparisonComponent } from './quote-comparison.component';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { QuoteComparisonConfig } from '../../../../core/quote-comparison-config/quote-comparison-config';
import { FSCart } from '@spartacus/fsa-storefront';

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
const cart2: FSCart = {
  code: 'test002',
  insuranceQuote: {
    cartCode: 'test002',
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
const quoteComparisonConfig: QuoteComparisonConfig = {
  categoryConfig: [
    {
      categoryCode: 'insurances_travel',
      visibleInsuredObjects: [
        'tripDestination',
        'tripStartDate',
        'costOfTrip',
        'tripEndDate',
      ],
      billingEvents: true,
      optionalProducts: true,
    },
  ],
};
const quoteComparisonCarts = {
  carts: [cart1, cart2],
};
class MockRoutingService {
  go = createSpy();
  getRouterState(): Observable<any> {
    return of({
      state: {
        queryParams: {
          cartCodes: '00001001,00001000',
        },
      },
    });
  }
}

class MockQuoteService {
  retrieveQuoteCheckout = createSpy().and.returnValue(of(cart1));
  getQuotesComparison() {
    return of(quoteComparisonCarts);
  }
  loadQuotesComparison(quoteCodes) {
    return of();
  }
  getQuotesLoaded() { }
}

class MockFSTranslationService {
  getTranslationValue() { }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('QuoteComparisonComponent', () => {
  let component: QuoteComparisonComponent;
  let fixture: ComponentFixture<QuoteComparisonComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let languageService: LanguageService;
  let fSTranslationService: FSTranslationService;
  let userIdService: UserIdService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuoteComparisonComponent],
        providers: [
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: FSTranslationService,
            useClass: MockFSTranslationService,
          },
          {
            provide: QuoteComparisonConfig,
            useValue: quoteComparisonConfig,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: LanguageService,
            useClass: MockLanguageService,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.inject(QuoteService);
    fSTranslationService = TestBed.inject(FSTranslationService);
    routingService = TestBed.inject(RoutingService);
    languageService = TestBed.inject(LanguageService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(routingService, 'getRouterState').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not retrieve quote', () => {
    component.retrieveQuote({});
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should retrieve quote', () => {
    component.retrieveQuote(cart1);
    expect(quoteService.retrieveQuoteCheckout).toHaveBeenCalled();
  });

  it('should find translation for key', () => {
    spyOn(fSTranslationService, 'getTranslationValue').and.returnValue(
      'test value'
    );
    const translationValue = component.getTranslation(
      'quote.details',
      'insurances_auto',
      'tripDestination'
    );
    expect(translationValue).toEqual('test value');
  });

  it('should change language', () => {
    spyOn(languageService, 'getActive').and.returnValue(of('de'));
    component.changeLanguage();
    expect(component.language).toEqual('de');
  });
});
