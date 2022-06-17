import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormDataStorageService } from '@spartacus/dynamicforms';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';
import {
  FSUserRole,
  FSUser,
  QuoteActionType,
} from '../../../../occ/occ-models/occ.models';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';

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
  updateQuoteApplication(
    code: string,
    mockQuoteActionType: QuoteActionType
  ): Observable<unknown> {
    return of(null);
  }
}

class MockModalService {
  dismissActiveModal(): void {}
}

class MockFormDataStorageService {
  clearFormDataIdFromLocalStorage(formDataId: string) {}
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
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
  let modalService: MockModalService;
  let quoteService: MockQuoteService;
  let cartService: MockCartService;
  let formDataStorageService: MockFormDataStorageService;
  let oboConsentService: MockConsentService;
  let userAccountFacade: MockUserAccountFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [BindQuoteDialogComponent],
        providers: [
          {
            provide: ModalService,
            useClass: MockModalService,
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
    modalService = TestBed.inject(ModalService);
    cartService = TestBed.inject(FSCartService);
    formDataStorageService = TestBed.inject(FormDataStorageService);
    oboConsentService = TestBed.inject(ConsentService);
    userAccountFacade = TestBed.inject(UserAccountFacade);

    spyOn(quoteService, 'updateQuoteApplication').and.callThrough();
    spyOn(modalService, 'dismissActiveModal').and.callThrough();
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
    const dialogTitleEl = el.query(By.css('.popup-content-wrapper'))
      .nativeElement;
    expect(dialogTitleEl.textContent).toContain('quote.bindingConfirmation');
    expect(dialogTitleEl.textContent).toContain('quote.confirmInformation');
  });

  it('should bind quote', () => {
    component.bindQuote();
    expect(quoteService.updateQuoteApplication).toHaveBeenCalledWith(
      mockCart.code,
      QuoteActionType.BIND
    );
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
