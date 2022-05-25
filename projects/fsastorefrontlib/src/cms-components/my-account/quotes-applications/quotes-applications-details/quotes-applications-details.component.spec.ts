import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSCart, InsuranceQuote } from '../../../../occ/occ-models/occ.models';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { QuotesApplicationsDetailsComponent } from './quotes-applications-details.component';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import createSpy = jasmine.createSpy;

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
  quoteStatus: 'unfinished',
};
const insuredObjectType = 'TEST_TYPE';

class MockRoutingService {
  go() {}
  getRouterState(): Observable<any> {
    return of({
      state: {
        params: {
          quoteId: '0000002',
        },
      },
    });
  }
}

class MockQuoteService {
  quoteForCompare$ = new BehaviorSubject<InsuranceQuote>(insuranceQuote1);
  retrieveQuoteCheckout = createSpy().and.returnValue(of(cart1));
  getQuoteDetails() {
    return of(insuranceQuote1);
  }
  getQuotesLoaded() {
    return of(true);
  }
  loadQuoteDetails() {}
  setQuoteForCompare() {}
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
}

class MockCartService {
  loadCart() {}
  getCart() {}
}

describe('QuoteDetailsComponent', () => {
  let component: QuotesApplicationsDetailsComponent;
  let fixture: ComponentFixture<QuotesApplicationsDetailsComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let userIdService: UserIdService;
  let fSTranslationService: FSTranslationService;
  let fSCartService: FSCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuotesApplicationsDetailsComponent],
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
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          {
            provide: FSTranslationService,
            useClass: MockFSTranslationService,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesApplicationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.inject(QuoteService);
    routingService = TestBed.inject(RoutingService);
    fSCartService = TestBed.inject(FSCartService);
    userIdService = TestBed.inject(UserIdService);
    fSTranslationService = TestBed.inject(FSTranslationService);
    spyOn(routingService, 'go').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not retrieve quote', () => {
    component.retrieveQuote({});
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should compare quote', () => {
    component.compareQuote(insuranceQuote1);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should translate', () => {
    spyOn(fSTranslationService, 'getTranslationValue').and.callThrough();
    component.getTranslation(
      insuranceQuote1.defaultCategory.code,
      insuredObjectType
    );
    expect(fSTranslationService.getTranslationValue).toHaveBeenCalled();
  });
});
