import { By } from '@angular/platform-browser';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { DebugElement, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CartService,
  I18nTestingModule,
  Cart,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ModalService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

const mockCart: FSCart = {
  code: 'test001',
  insuranceQuote: {
    quoteId: 'testQuote001',
    state: {
      code: 'UNBIND',
    },
  },
};
class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockQuoteService {
  bindQuote(cartCode: string): void {}
}

class MockModalService {
  dismissActiveModal(): void {}
}
class MockRoutingService {
  go = createSpy();
}

describe('BindQuoteDialogComponent', () => {
  let component: BindQuoteDialogComponent;
  let fixture: ComponentFixture<BindQuoteDialogComponent>;
  let el: DebugElement;
  let cartService: CartService;
  let modalService: MockModalService;
  let quoteService: MockQuoteService;

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
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: QuoteService,
          useClass: MockQuoteService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindQuoteDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    cartService = TestBed.get(CartService as Type<CartService>);
    quoteService = TestBed.get(QuoteService as Type<QuoteService>);
    modalService = TestBed.get(ModalService as Type<ModalService>);

    spyOn(cartService, 'getActive').and.callThrough();
    spyOn(quoteService, 'bindQuote').and.callThrough();
    spyOn(modalService, 'dismissActiveModal').and.callThrough();
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
});
