import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';

const cartCode = 'test001';
const quoteId = 'testQuote001';
const chooseCoverFormId = 'chooseCoverForm1';
const personalDetailsFormId = 'personalDetailsFormId';

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

class MockModalService {
  dismissActiveModal(): void {}
}

class MockFormDataStorageService {
  clearFormDataIdFromLocalStorage(formDataId: string) {}
}

describe('BindQuoteDialogComponent', () => {
  let component: BindQuoteDialogComponent;
  let fixture: ComponentFixture<BindQuoteDialogComponent>;
  let el: DebugElement;
  let modalService: MockModalService;
  let quoteService: MockQuoteService;
  let cartService: MockCartService;
  let formDataStorageService: MockFormDataStorageService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindQuoteDialogComponent);
    component = fixture.componentInstance;
    component.cartCode = cartCode;
    el = fixture.debugElement;
    quoteService = TestBed.inject(QuoteService);
    modalService = TestBed.inject(ModalService);
    cartService = TestBed.inject(FSCartService);
    formDataStorageService = TestBed.inject(FormDataStorageService);

    spyOn(quoteService, 'bindQuote').and.callThrough();
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
    expect(quoteService.bindQuote).toHaveBeenCalledWith(mockCart.code);
  });

  it('should bind quote and remove form data', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithForms));
    component.bindQuote();
    expect(
      formDataStorageService.clearFormDataIdFromLocalStorage
    ).toHaveBeenCalledWith(personalDetailsFormId);
  });
});
