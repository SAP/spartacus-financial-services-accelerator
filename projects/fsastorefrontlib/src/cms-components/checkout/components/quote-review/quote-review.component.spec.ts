import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OccConfig,
  RoutingService,
} from '@spartacus/core';
import { ModalService, SpinnerModule } from '@spartacus/storefront';
import { of, Observable } from 'rxjs';
import { FSCart, FSOrderEntry, FSSteps } from '../../../../occ/occ-models';
import { ReferredQuoteDialogComponent } from '../referred-quote/referred-quote-dialog.component';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { QuoteReviewComponent } from './quote-review.component';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
const formDataContent = '{"content":"formContent"}';

const mockOrderEntries: FSOrderEntry[] = [{ removeable: true }];

const mockCart: any = {
  code: 'test001',
  insuranceQuote: {
    quoteId: 'testQuote001',
    state: {
      code: 'BIND',
    },
    quoteWorkflowStatus: {
      code: 'REFERRED',
    },
  },
};

class MockActivatedRoute {
  params = of();
}

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};
class MockFSCheckoutService {
  filterRemoveableEntries() {
    return mockOrderEntries;
  }
}
class MockCategoryService {
  setActiveCategory(category: string) {}

  getActiveCategory(): Observable<string> {
    return of('testCategory');
  }
}

class MockCartService {
  getActive() {
    return of(mockCart);
  }
  isStable() {}
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

class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

const modalInstance: any = {
  componentInstance: {
    cartCode: '',
    nextStepUrl: '',
    quoteBinding$: of(false),
    referredQuote$: of(false),
  },
};
const modalService = jasmine.createSpyObj('ModalService', ['open']);

describe('Quote Review Component', () => {
  let component: QuoteReviewComponent;
  let fixture: ComponentFixture<QuoteReviewComponent>;
  let routingService: RoutingService;
  let translationService: FSTranslationService;
  let globalMessageService: GlobalMessageService;
  let mockCartService: FSCartService;
  let mockCheckoutService: FSCheckoutService;

  beforeEach(
    waitForAsync(() => {
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
            useClass: MockCartService,
          },
          {
            provide: ModalService,
            useValue: modalService,
          },
          {
            provide: FSTranslationService,
            useClass: MockFSTranslationService,
          },
          {
            provide: CategoryService,
            useClass: MockCategoryService,
          },
          {
            provide: FSCheckoutService,
            useClass: MockFSCheckoutService,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService);
    translationService = TestBed.inject(FSTranslationService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockCartService = TestBed.inject(FSCartService);
    mockCheckoutService = TestBed.inject(FSCheckoutService);
    spyOn(routingService, 'go').and.stub();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to next step when quote is in state BIND', () => {
    const cart: FSCart = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
    };
    component.navigateNext(mockCategoryAndStep, cart);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not continue to the next step when quote is in state UNBIND', () => {
    modalService.open.and.returnValue(modalInstance);
    const cart: FSCart = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'UNBIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
    };

    component.navigateNext(mockCategoryAndStep, cart);
    expect(routingService.go).not.toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(true);
  });

  it('should open ReferredQuoteDialog popup', () => {
    modalService.open.and.returnValue(modalInstance);
    const cart: FSCart = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
        quoteWorkflowStatus: {
          code: 'REFERRED',
        },
      },
    };

    component.navigateNext(mockCategoryAndStep, cart);
    expect(routingService.go).not.toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(
      ReferredQuoteDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    );
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(true);
  });

  it('should go back to previous step', () => {
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not get form content 1', () => {
    const content = component.getFormContent(undefined);
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

  it('should not get form content 5', () => {
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
    const baseUrl = component.baseUrl;
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

  it('step should not be editable if quote status id BIND', () => {
    const result = component.isEditable('BIND');
    expect(result).toEqual(false);
  });

  it('should display message when quote is in state PENDING', () => {
    const cart: FSCart = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
        quoteWorkflowStatus: {
          code: 'PENDING',
        },
      },
    };
    spyOn(globalMessageService, 'add').and.stub();
    spyOn(mockCartService, 'getActive').and.returnValue(of(cart));
    component.ngOnInit();
    component.displayQuoteStatusPendingMessage();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'quoteReview.status.pending' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  it('should check if removeable entries exists', () => {
    spyOn(mockCheckoutService, 'filterRemoveableEntries').and.callThrough();
    const result = component.checkIfRemoveableEntriesExists(mockCart);
    expect(mockCheckoutService.filterRemoveableEntries).toHaveBeenCalled();
    expect(result).toEqual(true);
  });
});
