import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { ModalService, SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { CategoryService } from './../../../../core/checkout/services/category/category.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { QuoteReviewComponent } from './quote-review.component';

const formDataContent = '{"content":"formContent"}';
const categoryCode = 'insurances_auto';

class MockActivatedRoute {
  params = of();
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      legacy: false,
    },
  },
};

class FSCartServiceStub {
  getActive() {}
  getLoaded() {}
}
class MockCategoryService {
  getActiveCategory(): Observable<string> {
    return of(categoryCode);
  }
}
class MockRoutingService {
  go() {}
}

class FSCheckoutConfigServiceStub {
  getNextCheckoutStepUrl() {}
  getPreviousCheckoutStepUrl() {
    return 'url/:formCode';
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
}

const modalInstance: any = {
  componentInstance: {
    cartCode: '',
    nextStepUrl: '',
    quoteBinding$: of(true),
  },
};

const modalService = jasmine.createSpyObj('ModalService', ['open']);

describe('Quote Review Component', () => {
  let component: QuoteReviewComponent;
  let fixture: ComponentFixture<QuoteReviewComponent>;
  let routingService: RoutingService;
  let translationService: FSTranslationService;
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, AccordionModule, I18nTestingModule],
      declarations: [QuoteReviewComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: FSCheckoutConfigServiceStub,
        },
        {
          provide: OccConfig,
          useValue: MockOccModuleConfig,
        },
        {
          provide: FSCartService,
          useClass: FSCartServiceStub,
        },
        {
          provide: ModalService,
          useValue: modalService,
        },
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
        {
          provide: FSTranslationService,
          useClass: MockFSTranslationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    categoryService = TestBed.get(CategoryService as Type<CategoryService>);
    translationService = TestBed.get(FSTranslationService as Type<
      FSTranslationService
    >);
    spyOn(routingService, 'go').and.stub();
    spyOn(categoryService, 'getActiveCategory').and.callThrough();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.categoryCode).toEqual(categoryCode);
  });

  it('should continue to next step when quote is in state BIND', () => {
    component.cart$ = of({
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
      },
    });
    component.continue();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not continue to the next step when quote is in state UNBIND', () => {
    modalService.open.and.returnValue(modalInstance);
    component.cart$ = of({
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'UNBIND',
        },
      },
    });

    component.continue();
    expect(routingService.go).not.toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(false);
  });

  it('should go back to previous step', () => {
    component.back();
    expect(routingService.go).toHaveBeenCalledWith(`url/${categoryCode}`);
  });

  it('should not get form content 1', () => {
    const content = component.getFormContent({});
    expect(content).toEqual(undefined);
  });

  it('should not get form content 2', () => {
    const content = component.getFormContent({ deliveryOrderGroups: [] });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 3', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 4', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [{}] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 4', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [{ formData: [] }] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should get form content', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [
        { entries: [{ formData: [{ content: formDataContent }] }] },
      ],
    });
    const parsedContent = JSON.parse(formDataContent);
    expect(content).toEqual(parsedContent);
  });

  it('should get base url', () => {
    const baseUrl = component.getBaseUrl();
    expect(baseUrl).toEqual('');
  });

  it('should find translation for key', () => {
    spyOn(translationService, 'getTranslationValue').and.returnValue(
      'test value'
    );
    const translationValue = component.getTranslation(
      'insurances_auto',
      'vehicleMake'
    );
    expect(translationValue).toEqual('test value');
  });
});
