import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Cart, I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import { StepResult } from '../../../../occ/occ-models';

import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import createSpy = jasmine.createSpy;

const mockCategoryAndStep: StepResult = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

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

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

class MockActivatedRoute {
  params = of();
}
class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  underwriteQuote = createSpy();
  updateQuote = createSpy();
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
  let routingService: RoutingService;
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
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back to previous step', () => {
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate next', () => {
    component.navigateNext(mockCategoryAndStep);
    expect(quoteService.underwriteQuote).toHaveBeenCalledWith(mockCart.code);
  });
});
