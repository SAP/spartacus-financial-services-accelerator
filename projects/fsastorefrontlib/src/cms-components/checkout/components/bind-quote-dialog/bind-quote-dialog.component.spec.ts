import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  FormDataStorageService,
  OboCustomerService,
} from '@spartacus/dynamicforms';
import { LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSUser, FSUserRole } from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';

const cartCode = 'test001';
const quoteId = 'testQuote001';
const chooseCoverFormId = 'chooseCoverForm1';
const personalDetailsFormId = 'personalDetailsFormId';
const firstName = 'Donna';
const lastName = 'Moore';

const mockCart: FSCart = {
  code: cartCode,
  insuranceQuote: {
    quoteId: quoteId,
    state: {
      code: 'UNBIND',
    },
  },
};

const cartWithForms = {
  code: cartCode,
  entries: [
    {
      formData: [
        {
          chooseCoverFormId,
        },
      ],
    },
  ],
  insuranceQuote: {
    quoteId: 'testQuote001',
    quoteDetails: {
      formId: personalDetailsFormId,
    },
  },
};

const mockUser: FSUser = {
  firstName: firstName,
  lastName: lastName,
  roles: [],
};

const mockOBOConsentCustomer: FSUser = {
  uid: 'oboconsentuid',
};

class MockCartService {
  getActive(): any {
    return of(mockCart);
  }
  isStable() {
    return of(true);
  }
}

class MockQuoteService {
  bindQuote(code: string): void {}
}

class MockLaunchDialogService {
  closeDialog(reason: String): void {}
  get data$(): Observable<any> {
    return new BehaviorSubject<any>(undefined).asObservable();
  }
}

class MockFormDataStorageService {
  clearFormDataIdFromLocalStorage(formDataId: string) {}
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

class MockOboCustomerService {
  getOboCustomerUserId() {
    return of('test@sap.com');
  }
}

class MockConsentService {
  selectedOBOCustomer$ = of(mockOBOConsentCustomer);
  transferCartToSelectedOBOCustomer(mockCart, mockUser, oboConsentCustomer) {}
}

describe('BindQuoteDialogComponent', () => {
  let component: BindQuoteDialogComponent;
  let fixture: ComponentFixture<BindQuoteDialogComponent>;
  let el: DebugElement;
  let launchDialogService: MockLaunchDialogService;
  let quoteService: MockQuoteService;
  let cartService: MockCartService;
  let formDataStorageService: MockFormDataStorageService;
  let oboConsentService: MockConsentService;
  let oboCustomerService: MockOboCustomerService;
  let userAccountFacade: MockUserAccountFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [BindQuoteDialogComponent],
        providers: [
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
          { provide: UserAccountFacade, useClass: MockUserAccountFacade },
          { provide: ConsentService, useClass: MockConsentService },
          { provide: OboCustomerService, useClass: MockOboCustomerService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BindQuoteDialogComponent);
    component = fixture.componentInstance;
    component.cartCode = cartCode;
    el = fixture.debugElement;
    quoteService = TestBed.inject(QuoteService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    cartService = TestBed.inject(FSCartService);
    formDataStorageService = TestBed.inject(FormDataStorageService);
    oboConsentService = TestBed.inject(ConsentService);
    oboCustomerService = TestBed.inject(OboCustomerService);
    userAccountFacade = TestBed.inject(UserAccountFacade);

    spyOn(quoteService, 'bindQuote').and.callThrough();
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    spyOn(
      formDataStorageService,
      'clearFormDataIdFromLocalStorage'
    ).and.callThrough();
  });

  it('should create popup', () => {
    expect(component).toBeTruthy();
  });

  it('should show quote binding components', () => {
    fixture.detectChanges();
    const dialogTitleEl = el.query(
      By.css('.popup-content-wrapper')
    ).nativeElement;
    expect(dialogTitleEl.textContent).toContain('quote.bindingConfirmation');
    expect(dialogTitleEl.textContent).toContain('quote.confirmInformation');
  });

  it('should bind quote', () => {
    component.bindQuote();
    expect(quoteService.bindQuote).toHaveBeenCalledWith(mockCart.code);
  });

  it('should bind quote and remove form data', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithForms));
    component.bindQuote();
    expect(
      formDataStorageService.clearFormDataIdFromLocalStorage
    ).toHaveBeenCalledWith(personalDetailsFormId);
  });

  it('should bind quote and transfer cart to OBO customer', () => {
    spyOn(
      oboConsentService,
      'transferCartToSelectedOBOCustomer'
    ).and.callThrough();
    const sellerUser: FSUser = {
      firstName: firstName,
      lastName: lastName,
      roles: [FSUserRole.SELLER],
    };
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithForms));
    spyOn(userAccountFacade, 'get').and.returnValue(of(sellerUser));
    component.bindQuote();
    expect(
      oboConsentService.transferCartToSelectedOBOCustomer
    ).toHaveBeenCalled();
  });
});
