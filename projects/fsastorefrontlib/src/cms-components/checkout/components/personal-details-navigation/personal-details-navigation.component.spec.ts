import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { Cart, I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import { ActiveCategoryStep } from '../../../../occ/occ-models';

import createSpy = jasmine.createSpy;

const mockCategoryAndStep: ActiveCategoryStep = {
  activeCategory: 'insurances_travel',
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

describe('PersonalDetailsNavigationComponent', () => {
  let component: PersonalDetailsNavigationComponent;
  let fixture: ComponentFixture<PersonalDetailsNavigationComponent>;
  let quoteService: MockQuoteService;
  let routingService: RoutingService;

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
      ],
    }).compileComponents();

    quoteService = TestBed.get(QuoteService as Type<QuoteService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.callThrough();
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
