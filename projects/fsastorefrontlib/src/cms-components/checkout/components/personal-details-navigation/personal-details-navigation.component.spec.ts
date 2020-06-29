import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { Cart, I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import createSpy = jasmine.createSpy;

const mockCart = {
  code: '1234',
  entries: [
    {
      entryNumber: 1,
      formData: [
        {
          id: 'formData1',
        },
      ],
    },
  ],
};

const formData = {
  content: 'content',
};

class MockActivatedRoute {
  params = of();
}
class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  underwriteQuote = createSpy();
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return '';
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockFormService {
  submit = createSpy();

  getSubmittedForm() {
    return of(formData);
  }
}

class MockPricingService {
  buildPricingData() {
    return { attribute: 'test' };
  }
}

describe('PersonalDetailsNavigationComponent', () => {
  let component: PersonalDetailsNavigationComponent;
  let fixture: ComponentFixture<PersonalDetailsNavigationComponent>;
  let quoteService: QuoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [PersonalDetailsNavigationComponent],
      providers: [
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
        {
          provide: FormDataService,
          useClass: MockFormService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: QuoteService,
          useClass: MockQuoteService,
        },
        {
          provide: PricingService,
          useClass: MockPricingService,
        },
      ],
    }).compileComponents();

    quoteService = TestBed.inject(QuoteService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate next', () => {
    component.navigateNext();
    expect(quoteService.underwriteQuote).toHaveBeenCalledWith(mockCart.code);
  });
});
