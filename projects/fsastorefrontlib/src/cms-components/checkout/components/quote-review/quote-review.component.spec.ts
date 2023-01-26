import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OccConfig,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { SpinnerModule } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { ConsentConnector } from '../../../../core/my-account/connectors/consent.connector';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';
import { FSCart, FSOrderEntry, FSSteps } from '../../../../occ/occ-models';
import { FSUser, FSUserRole } from '../../../../occ/occ-models/occ.models';
import { ReferredQuoteDialogComponent } from '../referred-quote/referred-quote-dialog.component';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { QuoteReviewComponent } from './quote-review.component';

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

const code1 = '000001';
const date1 = 'date1';
const consentHolderName1 = 'chName1';
const consentHolderUid1 = 'chUid1';
const consentTemplateId1 = 'ctId1';
const consentTemplateDesc1 = 'ctDesc1';
const consentTemplateVersion1 = 'ctVersion1';
const customerName1 = 'customerName1';
const customerUid1 = 'customerUid1';

const code2 = '000002';
const date2 = 'date2';
const consentHolderName2 = 'chName2';
const consentHolderUid2 = 'chUid2';
const consentTemplateId2 = 'ctId2';
const consentTemplateDesc2 = 'ctDesc2';
const consentTemplateVersion2 = 'ctVersion2';
const customerName2 = 'customerName2';
const customerUid2 = 'customerUid2';

const consent1 = {
  code: code1,
  consentGivenDate: date1,
  consentHolders: [
    {
      name: consentHolderName1,
      uid: consentHolderUid1,
    },
  ],
  consentTemplate: {
    id: consentTemplateId1,
    description: consentTemplateDesc1,
    version: consentTemplateVersion1,
  },
  customer: {
    name: customerName1,
    uid: customerUid1,
  },
  oboPermissionConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
};

const consent2 = {
  code: code2,
  consentGivenDate: date2,
  consentHolders: [
    {
      name: consentHolderName2,
      uid: consentHolderUid2,
    },
  ],
  consentTemplate: {
    id: consentTemplateId2,
    description: consentTemplateDesc2,
    version: consentTemplateVersion2,
  },
  customer: {
    name: customerName2,
    uid: customerUid2,
  },
  oboPermissionConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
};

const consentList = [consent1, consent2];

const mockUser: FSUser = {
  firstName: 'Donna',
  lastName: 'Moore',
  roles: [FSUserRole.SELLER],
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
  translate() {}
}

class MockConsentConnector {
  getOBOCustomerList() {
    return of(consentList);
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

class MockConsentService {
  setSelectedOBOCustomer(oboConsentCustomer) {}
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
const launchDialogService = jasmine.createSpyObj('LaunchDialogService', [
  'open',
]);

describe('Quote Review Component', () => {
  let component: QuoteReviewComponent;
  let fixture: ComponentFixture<QuoteReviewComponent>;
  let routingService: RoutingService;
  let translationService: FSTranslationService;
  let globalMessageService: GlobalMessageService;
  let mockCartService: FSCartService;
  let mockCheckoutService: FSCheckoutService;
  let winRef: WindowRef;
  let mockConsentConnector: MockConsentConnector;
  let userAccountFacade: MockUserAccountFacade;
  let oboConsentService: ConsentService;

  beforeEach(
    waitForAsync(() => {
      mockConsentConnector = new MockConsentConnector();
      TestBed.configureTestingModule({
        imports: [SpinnerModule, AccordionModule, I18nTestingModule],
        declarations: [QuoteReviewComponent],
        providers: [
          { provide: ConsentConnector, useValue: mockConsentConnector },
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
            provide: LaunchDialogService,
            useValue: launchDialogService,
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
          { provide: UserAccountFacade, useClass: MockUserAccountFacade },
          { provide: ConsentService, useClass: MockConsentService },
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
    userAccountFacade = TestBed.inject(UserAccountFacade);
    oboConsentService = TestBed.inject(ConsentService);

    winRef = TestBed.inject(WindowRef);
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
    launchDialogService.openDialog().and.callThrough();
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
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      BindQuoteDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    );
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(true);
  });

  it('should open ReferredQuoteDialog popup', () => {
    launchDialogService.openDialog().and.callThrough();
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
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
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
    const content = component.getFormContent({ entries: [] });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 3', () => {
    const content = component.getFormContent({
      entries: [],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 4', () => {
    const content = component.getFormContent({
      entries: [{}],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 5', () => {
    const content = component.getFormContent({
      entries: [{ formData: [] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should get form content', () => {
    const content = component.getFormContent({
      entries: [{ formData: [{ content: formDataContent }] }],
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
