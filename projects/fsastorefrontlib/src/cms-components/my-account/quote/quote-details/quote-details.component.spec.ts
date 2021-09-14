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
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { QuoteDetailsComponent } from '../../../my-account/quote/quote-details/quote-details.component';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import createSpy = jasmine.createSpy;

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
  retrieveQuoteCheckout = createSpy();
  getQuoteDetails() {
    return of(insuranceQuote1);
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
  let component: QuoteDetailsComponent;
  let fixture: ComponentFixture<QuoteDetailsComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let userIdService: UserIdService;
  let fSTranslationService: FSTranslationService;
  let fSCartService: FSCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuoteDetailsComponent],
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
    fixture = TestBed.createComponent(QuoteDetailsComponent);
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
